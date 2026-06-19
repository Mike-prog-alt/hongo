import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { supabase } from "../../backend/supabase";

export default function ProductDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collection");

  const [bag, setBag] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("bags")
        .select(`
          *,
          bag_images (*),
          bag_colors (color_name, color_hex, stock),
          bags_category (category),
          bags_collections (name)
        `)
        .eq("id", id)
        .single();

      if (cancelled) return;

      if (fetchError) {
        console.error("Error fetching product:", fetchError);
        setError("Product not found.");
        setBag(null);
        setLoading(false);
        return;
      }

      let categoryName = data.bags_category?.category ?? null;
      if (!categoryName && data.category_id) {
        const { data: categoryRow } = await supabase
          .from("bags_category")
          .select("category")
          .eq("id", data.category_id)
          .maybeSingle();
        categoryName = categoryRow?.category ?? null;
      }

      setBag({ ...data, categoryName });

      const main = data.bag_images?.find((img) => img.is_main) ?? data.bag_images?.[0];
      setActiveImage(main?.image_url ?? null);
      setSelectedColor(data.bag_colors?.[0] ?? null);
      setLoading(false);
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const backLink = collectionId
    ? `/pages/shop?collection=${collectionId}`
    : bag?.collection_id
      ? `/pages/shop?collection=${bag.collection_id}`
      : "/pages/shop";

  if (loading) {
    return (
      <div className="bg-white px-[15px] py-12 font-[Jost,sans-serif]">
        <div className="mx-auto max-w-[1170px]">
          <p className="text-[16px] text-[#808080]">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !bag) {
    return (
      <div className="bg-white px-[15px] py-12 font-[Jost,sans-serif]">
        <div className="mx-auto max-w-[1170px]">
          <p className="text-[16px] text-[#808080]">{error ?? "Product not found."}</p>
          <Link to="/pages/shop" className="mt-4 inline-block text-[#262626] underline">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const collectionName = bag?.bags_collections?.name;
  const categoryName = bag?.categoryName;
  const colors = bag?.bag_colors ?? [];
  const colorsSummary = colors
    .map((c) => `${c.color_name} (${c.stock} in stock)`)
    .join(", ");

  function handleColorSelect(color, colorIndex) {
    setSelectedColor(color);

    const images = bag.bag_images ?? [];
    if (images.length === 0) return;

    if (colorIndex === 0) {
      const main = images.find((img) => img.is_main) ?? images[0];
      setActiveImage(main.image_url);
      return;
    }

    if (colorIndex === 1) {
      setActiveImage(images[images.length - 1].image_url);
    }
  }

  const bagFields = [
    { label: "Name", value: bag.name },
    { label: "Manufacturer", value: bag.manufacturer },
    { label: "SKU", value: bag.sku },
    { label: "Price", value: `${bag.price} €` },
    { label: "Short description", value: bag.short_description },
    { label: "Description", value: bag.description },
    { label: "Detailed description", value: bag.detailed_description },
    { label: "Reviews average", value: bag.reviews_avg },
    { label: "Reviews count", value: bag.reviews_count },
    { label: "Category", value: categoryName },
    { label: "Collection", value: collectionName },
    { label: "Colors", value: colorsSummary || null },
  ];

  return (
    <div className="bg-white px-[15px] py-12 font-[Jost,sans-serif] md:py-16">
      <div className="mx-auto max-w-[1170px]">
        <Link
          to={backLink}
          className="mb-8 inline-flex items-center gap-1 text-[14px] text-[#808080] hover:text-[#262626]"
        >
          <i className="feather-arrow-left text-[14px]" />
          Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-4 overflow-hidden bg-[#f7f7f7]">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={bag.name}
                  className="aspect-[3/4] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[3/4] items-center justify-center text-[#808080]">
                  No image
                </div>
              )}
            </div>

            {bag.bag_images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {bag.bag_images.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImage(img.image_url)}
                    className={`overflow-hidden border-2 bg-[#f7f7f7] ${
                      activeImage === img.image_url ? "border-[#262626]" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="mb-2 text-[38px] font-medium tracking-[-1px] text-[#262626] md:text-[45px]">
              {bag.name}
            </h1>

            {(collectionName || categoryName) && (
              <p className="mb-4 text-[14px] uppercase tracking-wide text-[#808080]">
                {[categoryName, collectionName].filter(Boolean).join(" · ")}
              </p>
            )}

            <p className="mb-6 text-[28px] font-medium text-[#262626]">{bag.price} €</p>

            {bag.reviews_count > 0 && (
              <p className="mb-6 text-[14px] text-[#808080]">
                ★ {bag.reviews_avg} ({bag.reviews_count} reviews)
              </p>
            )}

            {bag.short_description && (
              <p className="mb-4 text-[18px] leading-8 text-[#262626]">{bag.short_description}</p>
            )}

            {bag.description && (
              <p className="mb-4 text-[16px] leading-8 text-[#808080]">{bag.description}</p>
            )}

            {bag.detailed_description && (
              <p className="mb-8 text-[16px] leading-8 text-[#808080]">{bag.detailed_description}</p>
            )}

            <div className="mb-8 flex flex-wrap gap-3 text-[14px] text-[#808080]">
              {bag.manufacturer && <span>Brand: {bag.manufacturer}</span>}
              {bag.sku && <span>SKU: {bag.sku}</span>}
            </div>

            {colors.length > 0 && (
              <div className="mb-8">
                <p className="mb-3 text-[12px] uppercase tracking-wide text-[#808080]">Color</p>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color, colorIndex) => {
                    const isSelected = selectedColor?.color_name === color.color_name;
                    const outOfStock = color.stock <= 0;

                    return (
                      <button
                        key={color.color_name}
                        type="button"
                        disabled={outOfStock}
                        onClick={() => handleColorSelect(color, colorIndex)}
                        title={`${color.color_name}${outOfStock ? " — out of stock" : ""}`}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                          isSelected ? "border-[#262626]" : "border-[#e4e4e4]"
                        } ${outOfStock ? "cursor-not-allowed opacity-40" : "hover:border-[#808080]"}`}
                      >
                        <span
                          className="block h-7 w-7 rounded-full border border-[#e4e4e4]"
                          style={{ backgroundColor: color.color_hex }}
                        />
                      </button>
                    );
                  })}
                </div>
                {selectedColor && (
                  <p className="mt-3 text-[14px] text-[#808080]">
                    {selectedColor.color_name}
                    {selectedColor.stock > 0
                      ? ` — ${selectedColor.stock} in stock`
                      : " — out of stock"}
                  </p>
                )}
              </div>
            )}

            <button
              type="button"
              className="rounded bg-[#262626] px-8 py-3 text-[14px] font-medium uppercase tracking-wide text-white transition hover:bg-black"
            >
              Add to cart
            </button>
          </div>
        </div>

        <section className="mt-16 border-t border-[#e4e4e4] pt-10">
          <h2 className="mb-6 text-[24px] font-medium text-[#262626]">Product details</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {bagFields.map(
              (field) =>
                field.value != null &&
                field.value !== "" && (
                  <div key={field.label} className="border-b border-[#f0f0f0] pb-3">
                    <dt className="text-[12px] uppercase tracking-wide text-[#808080]">
                      {field.label}
                    </dt>
                    <dd className="mt-1 text-[15px] text-[#262626] break-all">{field.value}</dd>
                  </div>
                )
            )}
          </dl>
        </section>
      </div>
    </div>
  );
}
