import { useGetCategoriesQuery, type Category } from "../../../store/recipesApi";

function getCategoryLabel(cat: Category): string {
  return typeof cat === "string" ? cat : cat.name;
}

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 bg-white"
    >
      <option value="">Todas las categorías</option>
      {categories.map((cat, i) => {
        const label = getCategoryLabel(cat);
        return (
          <option key={i} value={label}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
