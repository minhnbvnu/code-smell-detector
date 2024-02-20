function getStateFromProps(props) {
  let theme = checkLegacyTheming(props.theme, props);
  if (props.invertTheme) {
    if (typeof theme === 'string') {
      theme = `${theme}:inverted`;
    } else if (theme && theme.extend) {
      if (typeof theme === 'string') {
        theme = { ...theme, extend: `${theme.extend}:inverted` };
      } else {
        theme = { ...theme, extend: invertTheme(theme.extend) };
      }
    } else if (theme) {
      theme = invertTheme(theme);
    }
  }
  return {
    styling: createStylingFromTheme(theme)
  };
}