function _svg_lighten() {
        or = max(sr * da, dr * sa) + sr * (1 - da) + dr * (1 - sa);
        og = max(sg * da, dg * sa) + sg * (1 - da) + dg * (1 - sa);
        ob = max(sb * da, db * sa) + sb * (1 - da) + db * (1 - sa);
    }