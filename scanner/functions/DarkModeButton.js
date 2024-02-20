function DarkModeButton() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}