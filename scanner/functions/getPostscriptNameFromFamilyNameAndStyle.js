function getPostscriptNameFromFamilyNameAndStyle(familyName, style) {
    var util = require("util");
    var availableMembers = NSFontManager.sharedFontManager().availableMembersOfFontFamily(familyName);
    var font = util.toArray(availableMembers).find(function(item) {
        return item[1] == style;
    });
    return font[0];
}