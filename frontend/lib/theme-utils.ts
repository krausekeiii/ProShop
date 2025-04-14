// Masters Tournament color scheme
export const mastersColors = {
  green: "#006747", // Augusta National Green
  white: "#ffffff",
  yellow: "#ffcd00", // Masters Yellow
  red: "#e31837", // Masters Red
}

// Function to get a Masters color by name
export function getMastersColor(color: "green" | "white" | "yellow" | "red"): string {
  return mastersColors[color]
}

// Function to get a CSS variable for a Masters color
export function getMastersColorVar(color: "green" | "white" | "yellow" | "red"): string {
  const colorMap = {
    green: "var(--masters-green)",
    white: "var(--masters-white)",
    yellow: "var(--masters-yellow)",
    red: "var(--masters-red)",
  }

  return colorMap[color]
}
