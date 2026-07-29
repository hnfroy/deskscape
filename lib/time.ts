export type Scene = "day" | "sunset" | "night";

export function getCurrentScene(debugHour?: number): Scene {
  const hour = debugHour ?? new Date().getHours();

  if (hour >= 6 && hour < 16) {
    return "day";
  }

  if (hour >= 16 && hour < 18) {
    return "sunset";
  }

  return "night";
}