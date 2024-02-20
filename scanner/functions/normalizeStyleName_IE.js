function normalizeStyleName_IE(style) {
    if (style === 'float' || style === 'cssFloat')
      return 'styleFloat';
    return style.camelize();
  }