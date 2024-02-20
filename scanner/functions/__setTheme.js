function __setTheme(theme, module) {
    const $html = Vue.prototype.$$('html');
    const stylesheet = __getStylesheet();
    if (theme.type === 'builtIn') {
      // layout
      $html.addClass(`theme-${theme.builtIn.layout}`);
      // color
      if (!theme.builtIn.customColor) {
        $html.addClass(`color-theme-${theme.builtIn.color}`);
      }
      // bars/customColor
      stylesheet.innerHTML = __generateStylesheet(theme);
    } else if (theme.type === 'thirdParty' && module) {
      $html.addClass(`eb-theme-${module.info.relativeName}`);
    }
  }