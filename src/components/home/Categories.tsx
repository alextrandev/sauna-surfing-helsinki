export const categories = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Smoke",
    value: "smoke",
  },
  {
    label: "Modern",
    value: "modern",
  },
  {
    label: "Traditional",
    value: "traditional",
  },
] as const;

export type Category = (typeof categories)[number]["value"];