const personas = [
  {
    id: "male",
    name: "Alex",
    description: "Friendly, casual",
    color: "bg-pastel-blue text-blue-600"
  },
  {
    id: "female",
    name: "Sarah",
    description: "Warm, engaging",
    color: "bg-pastel-rose text-rose-600"
  },
  {
    id: "discord_kitten",
    name: "Kitten",
    description: "Chaotic, slang-heavy",
    color: "bg-purple-100 text-purple-600"
  }
];
function getPersonaById(id) {
  return personas.find((p) => p.id === id);
}
function getPersonaDisplayName(id) {
  const persona = getPersonaById(id);
  if (!persona) return id;
  return id === "discord_kitten" ? "Kitten" : persona.name;
}
const scenarios = [
  {
    id: "coffee_shop",
    name: "Coffee Shop",
    description: "Casual low-pressure intro with gentle ambient noise.",
    icon: "coffee"
  },
  {
    id: "restaurant",
    name: "Dinner Date",
    description: "Seated conversation with pacing and table etiquette cues.",
    icon: "utensils"
  },
  {
    id: "video_call",
    name: "Video Call",
    description: "Camera framing, eye contact, and virtual presence coaching.",
    icon: "video"
  }
];
function getScenarioById(id) {
  return scenarios.find((s) => s.id === id);
}
function getScenarioDisplayName(id) {
  const scenario = getScenarioById(id);
  return scenario?.name ?? id.replace("_", " ");
}
export {
  getScenarioDisplayName as a,
  getPersonaDisplayName as g,
  personas as p,
  scenarios as s
};
