function _qbb(u, v, w) {
            if (v == (u + w) / 2)
                return [u, w];
            else {
                const t = (u - v) / (u - 2 * v + w);
                const bd = u * (1 - t) ** 2 + 2 * v * (1 - t) * t + w * t ** 2;
                return [min(u, w, bd), max(u, w, bd)];
            }
        }