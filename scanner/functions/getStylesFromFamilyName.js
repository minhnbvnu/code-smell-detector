function getStylesFromFamilyName(name) {
    var util = require("util");
    var availableMembers = NSFontManager.sharedFontManager().availableMembersOfFontFamily(name);
    var styles = util.toArray(availableMembers).map(function(item) {
        return item[1];
    });
    return styles;
}