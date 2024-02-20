function cssRuleIsInsideMediaRule(cssRule) {
  while (cssRule) {
    if (cssRule.type === 'atrule' && cssRule.name === 'media') {
      // MEDIA_RULE
      return true;
    } else {
      cssRule = cssRule.parent;
    }
  }
  return false;
}