export const categories = [
  {
    label: "All",
    value: "all",
    icon: "sun"
  },
  {
    label: "Smoke",
    value: "smoke",
    icon: "flame"
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
    icon: "droplets"
  },
  {
    label: "Nature",
    value: "nature",
    icon: "trees"
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