function compressEdgeOverlaps(overlaps) {
        overlaps.sort((a, b) => {
            return a[0] - b[0];
        });
        for (let i = 1; i < overlaps.length; i++) {
            const overlap = overlaps[i];
            const prevOverlap = overlaps[i - 1];
            if (overlap[0] <= prevOverlap[1]) {
                prevOverlap[1] = Math.max(prevOverlap[1], overlap[1]);
                overlaps.splice(i, 1);
                i--;
            }
        }
    }