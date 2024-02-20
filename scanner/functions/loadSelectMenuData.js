function loadSelectMenuData(popupButton, symbols) {
    var preview = require("../modules/Preview");
    popupButton.removeAllItems();
    symbols.forEach(function(symbol) {
        var menuItem = NSMenuItem.alloc().init();
        var menuTitle;
        var menuImage;
        var symbolNative;
        if (symbol.type == "SymbolMaster") {
            if (symbol.getLibrary()) {
                menuTitle = symbol.getLibrary().name + " ▶︎ " + symbol.name;
            } else {
                menuTitle = symbol.name;
            }
            symbolNative = symbol.sketchObject;
        }
        if (symbol.type == "ImportableObject") {
            menuTitle = symbol.name;
            symbolNative = symbol.sketchObject.symbolMaster();
        }
        menuImage = preview.symbol(symbolNative, 40);
        menuImage.setSize(CGSizeMake(menuImage.size().width / 2, menuImage.size().height / 2));
        menuItem.setImage(menuImage);
        menuItem.setTitle(menuTitle);
        popupButton.menu().addItem(menuItem);
    });
}