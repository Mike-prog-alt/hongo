import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { supabase } from "../../backend/supabase";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collection");

  const [bags, setBags] = useState([]);
  const [collectionName, setCollectionName] = useState(null);
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
  }, [collectionId]);

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
              {collectionName ?? "Shop"}
            </h1>
            {collectionId && (
              <p className="mt-2 text-[16px] text-[#808080]">
                Products from this collection only
              </p>
            )}
          </div>
        </div>

        {loading && <p className="text-[16px] text-[#808080]">Loading products...</p>}

        {!loading && bags.length === 0 && (
          <p className="text-[16px] text-[#808080]">
            {collectionId
              ? "No products in this collection yet."
              : "No products found."}
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bags.map((bag) => {
            const mainImage = bag.bag_images?.find((img) => img.is_main === true);

            return (
              <article key={bag.id} className="group text-center">
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
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
