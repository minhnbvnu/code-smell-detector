function _svg_lightercolor() {
        if (dr * sa * 0.3 + dg * sa * 0.59 + db * sa * 0.11 > sr * da * 0.3 + sg * da * 0.59 + sb * da * 0.11) {
            or = dr * sa;
            og = dg * sa;
            ob = db * sa;
        } else {
            or = sr * da;
            og = sg * da;
            ob = sb * da;
        }
        or += sr * (1 - da) + dr * (1 - sa);
        og += sg * (1 - da) + dg * (1 - sa);
        ob += sb * (1 - da) + db * (1 - sa);
    }