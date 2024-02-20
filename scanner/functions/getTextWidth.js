function getTextWidth(string) {
    var metrics = fontMetrics[this.cache.font] = fontMetrics[this.cache.font] || {};
    string += '';
    for (var i = 0, sum = 0, len = string.length; i < len; ++i) {
        var c = string[i];
        sum += metrics[c] = metrics[c] || this.measureText(c).width;
    }
    return sum;
}