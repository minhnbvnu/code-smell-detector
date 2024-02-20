function useStorageTheme(key) {
  const userPreference =
    !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useState(
    // use stored theme; fallback to user preference
    localStorage.getItem(key) || userPreference
  )

  // update stored theme
  useEffect(() => {
    localStorage.setItem(key, theme)
  }, [theme, key])

  return [theme, setTheme]
}