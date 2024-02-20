function _svg_subtract() {
        or = max(dr * sa - sr * da, 0) + sr * (1 - da) + dr * (1 - sa);
        og = max(dg * sa - sg * da, 0) + sg * (1 - da) + dg * (1 - sa);
        ob = max(db * sa - sb * da, 0) + sb * (1 - da) + db * (1 - sa);
    }