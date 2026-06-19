import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { supabase } from "../../backend/supabase";
import {
  categoryIdsForGender,
  normalizeGender,
  shopGenders,
} from "../utils/bagsCategory";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collection");
  const categoryId = searchParams.get("category");
  const genderParam = searchParams.get("gender");
  const normalizedGender = normalizeGender(genderParam);
  const gender = shopGenders.includes(normalizedGender) ? normalizedGender : null;

  const [bags, setBags] = useState([]);
  const [collectionName, setCollectionName] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadShop() {
      setLoading(true);

      if (collectionId) {
        const { data: collection, error: collectionError } = await supabase
          .from("bags_collections")
          .select("name")
          .eq("id", collectionId)
          .maybeSingle();

        if (!cancelled) {
          if (collectionError) {
            console.error("Error fetching collection:", collectionError);
            setCollectionName(null);
          } else {
            setCollectionName(collection?.name ?? null);
          }
        }
      } else if (!cancelled) {
        setCollectionName(null);
      }

      if (categoryId) {
        const { data: category, error: categoryError } = await supabase
          .from("bags_category")
          .select("category")
          .eq("id", categoryId)
          .maybeSingle();

        if (!cancelled) {
          if (categoryError) {
            console.error("Error fetching category:", categoryError);
            setCategoryName(null);
          } else {
            setCategoryName(category?.category ?? null);
          }
        }
      } else if (!cancelled) {
        setCategoryName(null);
      }

      let query = supabase.from("bags").select(`
        id,
        name,
        price,
        collection_id,
        bag_images (
          id,
          image_url,
          is_main
        )
      `);

      if (collectionId) {
        query = query.eq("collection_id", Number(collectionId));
      }

      if (categoryId) {
        query = query.eq("category_id", categoryId);
      } else if (gender) {
        const { data: genderCategories, error: genderError } = await supabase
          .from("bags_category")
          .select("id, gender");

        if (genderError) {
          console.error("Error fetching categories for gender:", genderError);
        } else {
          const categoryIds = categoryIdsForGender(genderCategories ?? [], gender);
          if (categoryIds.length === 0) {
            if (!cancelled) {
              setBags([]);
              setLoading(false);
            }
            return;
          }
          query = query.in("category_id", categoryIds);
        }
      }

      const { data, error } = await query;

      if (!cancelled) {
        if (error) {
          console.error("Error fetching bags:", error);
          setBags([]);
        } else {
          setBags(data ?? []);
        }
        setLoading(false);
      }
    }

    loadShop();

    return () => {
      cancelled = true;
    };
  }, [collectionId, categoryId, gender]);

  const pageTitle =
    collectionName ??
    categoryName ??
    (gender === "man"
      ? "Man"
      : gender === "women"
        ? "Women"
        : gender === "brand"
          ? "Brand"
          : "Shop");

  return (
    <div className="bg-white px-[15px] py-12 font-[Jost,sans-serif] md:py-16">
      <div className="mx-auto max-w-[1170px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div>
            {collectionId && (
              <Link
                to="/collections"
                className="mb-3 inline-flex items-center gap-1 text-[14px] text-[#808080] hover:text-[#262626]"
              >
                <i className="feather-arrow-left text-[14px]" />
                All collections
              </Link>
            )}
            <h1 className="text-[38px] font-medium tracking-[-1px] text-[#262626] md:text-[45px]">
              {pageTitle}
            </h1>
            {(collectionId || categoryId || gender) && (
              <p className="mt-2 text-[16px] text-[#808080]">
                {collectionId
                  ? "Products from this collection only"
                  : categoryId
                    ? "Products from this category only"
                    : "Products from this section only"}
              </p>
            )}
          </div>
        </div>

        {loading && <p className="text-[16px] text-[#808080]">Loading products...</p>}

        {!loading && bags.length === 0 && (
          <p className="text-[16px] text-[#808080]">
            {collectionId
              ? "No products in this collection yet."
              : categoryId
                ? "No products in this category yet."
                : gender
                  ? "No products in this section yet."
                  : "No products found."}
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bags.map((bag) => {
            const mainImage = bag.bag_images?.find((img) => img.is_main === true);

            return (
              <Link
                key={bag.id}
                to={`/products/${bag.id}${collectionId ? `?collection=${collectionId}` : ""}`}
                className="group block text-center"
              >
                <div className="mb-4 overflow-hidden bg-[#f7f7f7]">
                  {mainImage ? (
                    <img
                      src={mainImage.image_url}
                      alt={bag.name}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-[3/4] w-full items-center justify-center text-[#808080]">
                      No image
                    </div>
                  )}
                </div>
                <h2 className="mb-1 text-[18px] font-medium text-[#262626]">{bag.name}</h2>
                <p className="text-[16px] text-[#262626]">{bag.price} €</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
