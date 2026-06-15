import { useState, useEffect } from "react";
import { supabase } from "../../backend/supabase";

export default function Shop() {
  const [bags, setBags] = useState([]);

  async function getBags() {
    const { data, error } = await supabase
      .from("bags")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setBags(data);
  }

  useEffect(() => {
    getBags();
  }, []);

  return (
    <div>
      <h1>Shop</h1>

      {bags.map((bag) => (
        <div key={bag.id}>
          <h2>{bag.name}</h2>
          <p>{bag.price} €</p>
        </div>
      ))}
    </div>
  );
}