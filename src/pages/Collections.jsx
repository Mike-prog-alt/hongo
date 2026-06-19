import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase } from "../../backend/supabase";

function formatImage(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("width", "800");
    return parsed.toString();
  } catch {
    return url;
  }
}

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      const { data, error } = await supabase
        .from("bags_collections")
        .select("id, name, image")
        .order("id");

      if (error) {
        console.error("Error fetching collections:", error);
      } else {
        setCollections(data ?? []);
      }
      setLoading(false);
    }

    fetchCollections();
  }, []);

  return (
    <div className="bg-white px-[15px] py-12 font-[Jost,sans-serif] md:py-16">
      <div className="mx-auto max-w-[1170px]">
        <h1 className="mb-10 text-[38px] font-medium tracking-[-1px] text-[#262626] md:mb-14 md:text-[45px]">
          All collections
        </h1>

        {loading && (
          <p className="text-[16px] text-[#808080]">Loading collections...</p>
        )}

        {!loading && collections.length === 0 && (
          <p className="text-[16px] text-[#808080]">No collections found.</p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <Link
              key={c.id}
              to={`/pages/shop?collection=${c.id}`}
              className="group block"
            >
              <div className="overflow-hidden bg-[#f7f7f7]">
                <img
                  src={formatImage(c.image)}
                  alt={c.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h2 className="mt-4 text-[18px] font-medium uppercase tracking-wide text-[#262626]">
                {c.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
