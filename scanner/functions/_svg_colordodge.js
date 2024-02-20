function _svg_colordodge() {
        if (da === 0) {
            or = sr;
            og = sg;
            ob = sb;
            return;
        }

        if (sr === sa && dr === 0) {
            or = sr * (1 - da);
        } else if (sr === sa) {
            or = sa * da + sr * (1 - da) + dr * (1 - sa);
        } else if (sr < sa) {
            or = sa * da * min(1, dr / da * sa / (sa - sr)) + sr * (1 - da) + dr * (1 - sa);
        }

        if (sg === sa && dg === 0) {
            og = sg * (1 - da);
        } else if (sr === sa) {
            og = sa * da + sg * (1 - da) + dg * (1 - sa);
        } else if (sr < sa) {
            og = sa * da * min(1, dg / da * sa / (sa - sg)) + sg * (1 - da) + dg * (1 - sa);
        }

        if (sb === sa && db === 0) {
            ob = sb * (1 - da);
        } else if (sr === sa) {
            ob = sa * da + sb * (1 - da) + db * (1 - sa);
        } else if (sr < sa) {
            ob = sa * da * min(1, db / da * sa / (sa - sb)) + sb * (1 - da) + db * (1 - sa);
        }
    }