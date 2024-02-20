function _svg_darken() {
        or = min(sr * da, dr * sa) + sr * (1 - da) + dr * (1 - sa);
        og = min(sg * da, dg * sa) + sg * (1 - da) + dg * (1 - sa);
        ob = min(sb * da, db * sa) + sb * (1 - da) + db * (1 - sa);
    }