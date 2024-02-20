function createTheme(theme) {
  let base = null;

  switch (theme.extends) {
    case 'dark':
      base = DARK_THEME;
      break;

    default:
      base = LIGHT_THEME;
      break;
  }

  theme = {...base, ...theme};

  // Reset inherited styles
  theme.__reset__ = {
    font: 'initial',
    cursor: 'initial',
    pointerEvents: 'initial',

    background: theme.background,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    lineHeight: theme.lineHeight,
    color: theme.textColorPrimary,
    textAlign: 'start'
  };

  return theme;
}