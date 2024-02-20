function __generateStylesheet(theme) {
    const $html = Vue.prototype.$$('html');
    let styles = '';
    if (theme.builtIn.customColor) {
      const colorThemeProperties = Vue.prototype.$Framework7.utils.colorThemeCSSProperties(theme.builtIn.customColor);
      if (Object.keys(colorThemeProperties).length) {
        styles += `
/* Custom color theme */
:root {
  ${Object.keys(colorThemeProperties)
    .map(key => `${key}: ${colorThemeProperties[key]};`)
    .join('\n  ')}
}`;
      }
    }
    if (theme.builtIn.bars === 'fill') {
      const colorThemeRgb = $html
        .css('--f7-theme-color-rgb')
        .trim()
        .split(',')
        .map(c => c.trim());
      styles += `
/* Invert navigation bars to fill style */
:root,
:root.theme-dark,
:root .theme-dark {
  --f7-bars-bg-color: var(--f7-theme-color);
  --f7-bars-bg-color-rgb: var(--f7-theme-color-rgb);
  --f7-bars-translucent-opacity: 0.9;
  --f7-bars-text-color: #fff;
  --f7-bars-link-color: #fff;
  --f7-navbar-subtitle-text-color: rgba(255,255,255,0.85);
  --f7-bars-border-color: transparent;
  --f7-tabbar-link-active-color: #fff;
  --f7-tabbar-link-inactive-color: rgba(255,255,255,0.54);
  --f7-sheet-border-color: transparent;
  --f7-tabbar-link-active-border-color: #fff;
}
.appbar,
.navbar,
.toolbar,
.subnavbar,
.calendar-header,
.calendar-footer {
  --f7-touch-ripple-color: var(--f7-touch-ripple-white);
  --f7-link-highlight-color: var(--f7-link-highlight-white);
  --f7-button-text-color: #fff;
  --f7-button-pressed-bg-color: rgba(255,255,255,0.1);
}
.navbar-large.navbar-transparent {
  --f7-navbar-large-title-text-color: #000;

  --r: ${colorThemeRgb[0]};
  --g: ${colorThemeRgb[1]};
  --b: ${colorThemeRgb[2]};
  --progress: var(--f7-navbar-large-collapse-progress);
  --f7-bars-link-color: rgb(
    calc(var(--r) + (255 - var(--r)) * var(--progress)),
    calc(var(--g) + (255 - var(--g)) * var(--progress)),
    calc(var(--b) + (255 - var(--b)) * var(--progress))
  );
}
.theme-dark .navbar-large.navbar-transparent {
  --f7-navbar-large-title-text-color: #fff;
}
          `;
    }
    return styles.trim();
  }