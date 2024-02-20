function compareDataObjects(dst, src) {
            if (!dst || !src || Object.keys(dst).length !== Object.keys(src).length) {
                return false;
            }
            for (const e in dst) {
                if (typeof dst[e] === "object") {
                    if (!compareDataObjects(dst[e], src[e])) {
                        return false;
                    }
                }
                else if (typeof dst[e] !== "function") {
                    if (dst[e] !== src[e]) {
                        return false;
                    }
                }
            }
            return true;
        }