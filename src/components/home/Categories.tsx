export const categories = [
  {
    label: "All",
    value: "all",
    icon: "sun"
  },
  {
    label: "Smoke",
    value: "smoke",
    icon: "fire"
  },
  {
    label: "Modern",
    value: "modern",
    icon: "house"
  },
  {
    label: "Traditional",
    value: "traditional",
    icon: "wooden"
  },
  {
    label: "Pool",
    value: "pool",
    icon: "pool"
  },
  {
    label: "Nature",
    value: "nature",
    icon: "tree"
  },
  {
    label: "Waterfront",
    value: "waterfront",
    icon: "water"
  },
  {
    label: "Music",
    value: "music",
    icon: "music-note"
  }
] as const;

export type Category = (typeof categories)[number]["value"];