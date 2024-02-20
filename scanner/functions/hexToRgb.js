function hexToRgb(hex) {

        // Verify already RGB (e.g. "rgb(0,0,0)") or RGBA (e.g. "rgba(0,0,0,0.5)")
        var rgba = /^rgba?\(([\d]+),([\d]+),([\d]+)(,([\d\.]+))?\)$/;
        if(rgba.test(hex)) {
            var result = rgba.exec(hex);
            return {
                r: parseInt(result[1]),
                g: parseInt(result[2]),
                b: parseInt(result[3]),
                a: parseInt(result[5] ? result[5] : 1)
            };
        }

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }