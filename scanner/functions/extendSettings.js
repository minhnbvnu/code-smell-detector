function extendSettings(settings, moreSettings) {
  var tmp = settings.fonts || [];
  extend(settings, moreSettings);
  // merge fonts, don't replace them
  if (moreSettings.fonts) {
    extendFontList(tmp, moreSettings.fonts);
  }
  settings.fonts = tmp;
}