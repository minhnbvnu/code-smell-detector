function initAppearance() 
{
    var csInterface = new CSInterface();
    updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);

    // Update the color of the panel when the theme color of the product changed.
    csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged);
}