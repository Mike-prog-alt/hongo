import { useState, useEffect } from "react";
import { supabase } from "../../backend/supabase";

export default function Shop() {
  const [bags, setBags] = useState([]);

  async function getBags() {
    const { data, error } = await supabase
      .from("bags")
      .select(`
        id,
        name,
        price,
        bag_images (
          id,
          image_url,
          is_main
        )
      `);

    if (error) {
      console.error("Error:", error);
      return;
    }

    setBags(data);
  }

  useEffect(() => {
    getBags();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shop</h1>

      {bags.map((bag) => {
        const mainImage = bag.bag_images?.find(
          (img) => img.is_main === true
        );

        return (
          <div key={bag.id} style={{ marginBottom: "30px" }}>
            <h2>{bag.name}</h2>
            <p>{bag.price} €</p>

            {mainImage && (
              <img
                src={mainImage.image_url}
                alt={bag.name}
                width={250}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}