function line_interpolation(renderer, geometry, x2, y2, x3, y3) {
        const { sx, sy } = geometry;
        let x0, x1;
        let y0, y1;
        if (geometry.type == "point") {
            // The +/- adjustments here are to dilate the hit point into a virtual "segment" to use below
            [y0, y1] = renderer.yscale.r_invert(sy - 1, sy + 1);
            [x0, x1] = renderer.xscale.r_invert(sx - 1, sx + 1);
        }
        else {
            // The +/- adjustments here are to handle cases such as purely horizontal or vertical lines
            if (geometry.direction == "v") {
                [y0, y1] = renderer.yscale.r_invert(sy, sy);
                [x0, x1] = [Math.min(x2 - 1, x3 - 1), Math.max(x2 + 1, x3 + 1)];
            }
            else {
                [x0, x1] = renderer.xscale.r_invert(sx, sx);
                [y0, y1] = [Math.min(y2 - 1, y3 - 1), Math.max(y2 + 1, y3 + 1)];
            }
        }
        const { x, y } = hittest.check_2_segments_intersect(x0, y0, x1, y1, x2, y2, x3, y3);
        return [x, y]; // XXX: null is not handled at use sites
    }