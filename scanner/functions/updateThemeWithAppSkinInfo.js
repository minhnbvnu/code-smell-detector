function updateThemeWithAppSkinInfo(appSkinInfo) {
        
        var panelBgColor = appSkinInfo.panelBackgroundColor.color;
        document.body.bgColor = toHex(panelBgColor);
    
        var styleId = "hostStyle";
        
        addRule(styleId, ".hostFontSize", "font-size:" + appSkinInfo.baseFontSize + "px;");
        addRule(styleId, ".hostFontFamily", "font-family:" + appSkinInfo.baseFontFamily);        
        addRule(styleId, ".hostFontColor", "color:" + "#" + reverseColor(panelBgColor, 20));        
        addRule(styleId, ".hostBgd", "background-color:" + "#" + toHex(panelBgColor, 20));
        addRule(styleId, ".hostBorder", "border-color: " + "#" + toHex(panelBgColor, -80));
    }