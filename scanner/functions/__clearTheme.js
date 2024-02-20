function __clearTheme() {
    const $html = Vue.prototype.$$('html');
    const stylesheet = __getStylesheet();
    // layout
    $html.removeClass('theme-dark theme-light');
    // bars/customColor
    stylesheet.innerHTML = '';
    // color
    let currentColorClass = $html[0].className.match(/color-theme-[a-z]*/g);
    if (currentColorClass) {
      for (const item of currentColorClass) {
        $html.removeClass(item);
      }
    }
    // module
    currentColorClass = $html[0].className.match(/eb-theme-[^"' ]*/g);
    if (currentColorClass) {
      for (const item of currentColorClass) {
        $html.removeClass(item);
      }
    }
  }