function replaceHexColors(src) {
    return src.replace(/#([0-9a-fA-F]+)/g, function (match, str) {
        const color = parseHexColor(str);
           
        if (str.length === 3 || str.length === 1 || str.length === 6) {
            if ((color.r === color.g) && (color.g === color.b)) {
                return `gray(${color.r})`;
            } else {
                return `rgb(${color.r}, ${color.g}, ${color.b})`;
            }
        } else {
            return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        }
    });
}