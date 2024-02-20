function rgba2rgb(orig) {
    if (!orig) {
        return {};
    } else if (orig.stops || orig.expression) {
        return { color: orig };
    } else if (typeof orig == 'string') {
        const result = orig.match(/(?:((hsl|rgb)a? *\(([\d.%]+(?:deg|g?rad|turn)?)[ ,]*([\d.%]+)[ ,]*([\d.%]+)[ ,/]*([\d.%]*)\))|(#((?:[\d\w]{3}){1,2})([\d\w]{1,2})?))/i);
        if (!result) {
            return { color: orig, opacity: 1.0 };
        } else if (result[7]) {
            let opacity = 1.0;
            if (result[9]) {
                opacity = parseInt(result[9].length == 1 ? `${result[9]}${result[9]}` : result[9], 16) * inv255;
            }
            return { color: `#${result[8]}`, opacity };
        } else if (result[0]) {
            return { color: `${result[2]}(${result[3]},${result[4]},${result[5]})`, opacity: (Number(result[6]) || 1.0) };
        }
    }
}