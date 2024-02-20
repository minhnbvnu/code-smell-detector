function applySubgridShift(pin, inverse, ct) {
        var val = { x: Number.NaN, y: Number.NaN };
        if (isNaN(pin.x)) {
            return val;
        }
        var tb = { x: pin.x, y: pin.y };
        tb.x -= ct.ll[0];
        tb.y -= ct.ll[1];
        tb.x = (0, adjust_lon_1.default)(tb.x - Math.PI) + Math.PI;
        var t = nadInterpolate(tb, ct);
        if (inverse) {
            if (isNaN(t.x)) {
                return val;
            }
            t.x = tb.x - t.x;
            t.y = tb.y - t.y;
            var i = 9, tol = 1e-12;
            var dif, del;
            do {
                del = nadInterpolate(t, ct);
                if (isNaN(del.x)) {
                    console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
                    break;
                }
                dif = { x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y) };
                t.x += dif.x;
                t.y += dif.y;
            } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
            if (i < 0) {
                console.log("Inverse grid shift iterator failed to converge.");
                return val;
            }
            val.x = (0, adjust_lon_1.default)(t.x + ct.ll[0]);
            val.y = t.y + ct.ll[1];
        }
        else {
            if (!isNaN(t.x)) {
                val.x = pin.x + t.x;
                val.y = pin.y + t.y;
            }
        }
        return val;
    }