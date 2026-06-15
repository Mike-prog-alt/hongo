export default function Marquee() {
  const items = [
    { text: "Luxury leather bags", type: "filled" },
    { text: "Premium collection",  type: "outline" },
    { text: "Handmade design",     type: "filled" },
    { text: "Luxury leather bags", type: "outline" },
    { text: "Premium collection",  type: "filled" },
    { text: "Handmade design",     type: "outline" },
  ];

  return (
    <div className="overflow-hidden w-full bg-white py-6 border-t border-b border-[#1a0a02]">
      <div className="flex w-max items-center gap-12 animate-marquee pointer-events-none select-none">
        {[...items, ...items].map((item, i) => (
          <>
            {item.type === "filled" ? (
              <span key={i} className="text-4xl font-light text-[#af6f3d] whitespace-nowrap">
                {item.text}
              </span>
            ) : (
              <span key={i} className="text-6xl font-bold text-transparent [-webkit-text-stroke:1.5px_#af6f3d] whitespace-nowrap">
                {item.text}
              </span>
            )}
            <span className="w-2 h-2 rounded-full bg-[#af6f3d] shrink-0" aria-hidden="true" />
          </>
        ))}
      </div>
    </div>
  );
}