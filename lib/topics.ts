export const TOPICS: Record<string, { label: string; description: string }> = {
  "brewing-methods": {
    label: "Brewing Methods",
    description: "Master pour-over, espresso, cold brew, AeroPress, and every extraction technique in between.",
  },
  "bean-origins": {
    label: "Bean Origins",
    description: "Explore single-origin coffees from Ethiopia, Colombia, Yemen, Japan, and beyond.",
  },
  "roasting-craft": {
    label: "Roasting Craft",
    description: "Dive into the science and art of roasting — profiles, Maillard reactions, and development time.",
  },
  "cafe-culture": {
    label: "Café Culture",
    description: "Third-wave cafés, specialty coffee bars, and the communities built around them.",
  },
  "equipment-gear": {
    label: "Equipment & Gear",
    description: "Grinders, brewers, scales, kettles — the tools that separate good coffee from great.",
  },
  "recipes-drinks": {
    label: "Recipes & Drinks",
    description: "Creative coffee recipes, seasonal drinks, cocktails, and food pairings.",
  },
};

export const VALID_TYPES = new Set(Object.keys(TOPICS));
