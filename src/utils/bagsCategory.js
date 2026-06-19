export const shopGenders = ["man", "women", "brand"];

export function normalizeGender(value) {
  return value?.trim().toLowerCase() ?? "";
}

export function categoriesForGender(categories, gender) {
  const target = normalizeGender(gender);
  return categories.filter((cat) => normalizeGender(cat.gender) === target);
}

export function categoryIdsForGender(categories, gender) {
  return categoriesForGender(categories, gender).map((cat) => cat.id);
}
