function _svg_colorburn() {
        if (da === 0) {
            or = sr;
            og = sg;
            ob = sb;
            return;
        }

        if (sr === 0 && dr === da) {
            or = sa * da + dr * (1 - sa);
        } else if (sr === 0) {
            or = dr * (1 - sa);
        } else if (sr > 0) {
            or = sa * da * (1 - min(1, (1 - dr / da) * sa / sr)) + sr * (1 - da) + dr * (1 - sa);
        }

        if (sg === 0 && dg === da) {
            og = sa * da + dg * (1 - sa);
        } else if (sg === 0) {
            og = dg * (1 - sa);
        } else if (sg > 0) {
            og = sa * da * (1 - min(1, (1 - dg / da) * sa / sg)) + sg * (1 - da) + dg * (1 - sa);
        }

        if (sb === 0 && db === da) {
            ob = sa * da + db * (1 - sa);
        } else if (sb === 0) {
            ob = db * (1 - sa);
        } else if (sb > 0) {
            ob = sa * da * (1 - min(1, (1 - db / da) * sa / sb)) + sb * (1 - da) + db * (1 - sa);
        }
    }