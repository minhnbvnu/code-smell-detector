function contentToUnicode()
{
    var newContent = {};
    for (var prop in this) {
        if (prop !== "toJSON")
            newContent[prop] = this[prop];
    }

    if (!this.text)
        return newContent;

    newContent.text = Array.prototype.map.call(this.text, function(x) {
        var charCode = x.charCodeAt(0);
        if ((charCode >= 0x20 && charCode < 0x7F) ||
             charCode === 0xA || charCode === 0xD)
            return x.charAt(0);

        var unicode = charCode.toString(16).toUpperCase();
        while (unicode.length < 4)
            unicode = "0" + unicode;
        return "\\u" + unicode;
    }).join("");

    return newContent;
}