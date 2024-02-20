function useDarkMode() {
  // Use our useLocalStorage hook to persist state through a page refresh.
  const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled');

  // See if user has set a browser or OS preference for dark mode.
  const prefersDarkMode = useMedia(
    ['(prefers-color-scheme: dark)'],
    [true],
    false,
  );

  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled = typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode;

  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = 'dark-mode';
      const element = window.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled],
  );

  return [enabled, setEnabledState];
}