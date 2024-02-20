function _saturation() {
        var hcl1 = rgbToHsy(dr, dg, db);
        var hcl2 = rgbToHsy(sr, sg, sb);
        var rgb = hsyToRgb(hcl1[0], hcl2[1], hcl1[2]);
        or = rgb[0];
        og = rgb[1];
        ob = rgb[2];
    }