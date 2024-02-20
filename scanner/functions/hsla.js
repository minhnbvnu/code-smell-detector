function hsla(origColor, hsl) {
        var color = colorFunctions.hsla(hsl.h, hsl.s, hsl.l, hsl.a);
        if (color) {
            if (origColor.value &&
                /^(rgb|hsl)/.test(origColor.value)) {
                color.value = origColor.value;
            }
            else {
                color.value = 'rgb';
            }
            return color;
        }
    }