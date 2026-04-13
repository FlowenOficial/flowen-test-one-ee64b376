import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("flowen_theme") as "dark" | "light") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("flowen_theme", theme);
  }, [theme]);

  const toggleTheme = () => setThemeState(t => t === "dark" ? "light" : "dark");

  return { theme, toggleTheme };
}
