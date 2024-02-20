function nadInterpolate(pin, ct) {
        var t = { x: pin.x / ct.del[0], y: pin.y / ct.del[1] };
        var indx = { x: Math.floor(t.x), y: Math.floor(t.y) };
        var frct = { x: t.x - 1.0 * indx.x, y: t.y - 1.0 * indx.y };
        var val = { x: Number.NaN, y: Number.NaN };
        var inx;
        if (indx.x < 0 || indx.x >= ct.lim[0]) {
            return val;
        }
        if (indx.y < 0 || indx.y >= ct.lim[1]) {
            return val;
        }
        inx = (indx.y * ct.lim[0]) + indx.x;
        var f00 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
        inx++;
        var f10 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
        inx += ct.lim[0];
        var f11 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
        inx--;
        var f01 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
        var m11 = frct.x * frct.y, m10 = frct.x * (1.0 - frct.y), m00 = (1.0 - frct.x) * (1.0 - frct.y), m01 = (1.0 - frct.x) * frct.y;
        val.x = (m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x);
        val.y = (m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y);
        return val;
    }