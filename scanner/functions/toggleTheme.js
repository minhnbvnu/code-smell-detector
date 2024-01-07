function toggleTheme() {
    let newTheme = theme === 'light' ? 'dark' : 'light';
    // High pri, responsive update.
    setTargetTheme(newTheme);
    // Perform the actual theme change in a separate update.
    setTimeout(() => onChange(newTheme), 0);
  }