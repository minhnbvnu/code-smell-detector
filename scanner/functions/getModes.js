function getModes(bm) {
        if (bm in modes) return modes[bm];
        return modes["*"];
    }