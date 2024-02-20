function _linearburn() {
        or = dr + sr;
        og = dg + sg;
        ob = db + sb;

        or = or < 255 ? 0 : (or - 255);
        og = og < 255 ? 0 : (og - 255);
        ob = ob < 255 ? 0 : (ob - 255);
    }