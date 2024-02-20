function ThemeProvider({theme, children}) {
  let resolvedTheme = themeCache.get(theme);
  if (!resolvedTheme) {
    resolvedTheme = createTheme(theme);
    themeCache.set(theme, resolvedTheme);
  }

  return <ThemeContext.Provider value={resolvedTheme}>{children}</ThemeContext.Provider>;
}