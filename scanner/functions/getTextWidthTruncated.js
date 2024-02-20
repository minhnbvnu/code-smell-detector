function getTextWidthTruncated(string, width, truncateTextWithEllipsis, abort) {
    var metrics = fontMetrics[this.cache.font],
        truncating = truncateTextWithEllipsis !== undefined,
        truncString, truncWidth, truncAt;

    if (!metrics) {
        metrics = fontMetrics[this.cache.font] = {};
        metrics[ELLIPSIS] = this.measureText(ELLIPSIS).width;
    }

    string += ''; // convert to string
    width += truncateTextWithEllipsis === false ? 2 : -1; // fudge for inequality
    for (var i = 0, sum = 0, len = string.length; i < len; ++i) {
        var char = string[i];
        var charWidth = metrics[char] = metrics[char] || this.measureText(char).width;
        sum += charWidth;
        if (!truncString && truncating && sum > width) {
            truncAt = i;
            switch (truncateTextWithEllipsis) {
                case true: // truncate sufficient characters to fit ellipsis if possible
                    truncWidth = sum - charWidth + metrics[ELLIPSIS];
                    while (truncAt && truncWidth > width) {
                        truncWidth -= metrics[string[--truncAt]];
                    }
                    truncString = truncWidth > width
                        ? '' // not enough room even for ellipsis
                        : truncString = string.substr(0, truncAt) + ELLIPSIS;
                    break;
                case false: // truncate *before* last partially visible character
                    truncString = string.substr(0, truncAt);
                    break;
                default: // truncate *after* partially visible character
                    if (++truncAt < string.length) {
                        truncString = string.substr(0, truncAt);
                    }
            }
            if (abort) { break; }
        }
    }
    return {
        string: truncString,
        width: sum
    };
}