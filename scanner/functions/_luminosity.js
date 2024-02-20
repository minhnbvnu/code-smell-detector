function _luminosity() {
        var hcl1 = rgbToHsy(dr, dg, db);
        var hcl2 = rgbToHsy(sr, sg, sb);
        var rgb = hsyToRgb(hcl1[0], hcl1[1], hcl2[2]);
        or = rgb[0];
        og = rgb[1];
        ob = rgb[2];
    }