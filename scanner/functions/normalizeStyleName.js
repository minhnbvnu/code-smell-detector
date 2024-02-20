function normalizeStyleName(style) {
    if (style === 'float' || style === 'styleFloat')
      return 'cssFloat';
    return style.camelize();
  }