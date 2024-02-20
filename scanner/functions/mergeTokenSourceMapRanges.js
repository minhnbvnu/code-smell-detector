function mergeTokenSourceMapRanges(sourceRanges, destRanges) {
            if (!destRanges)
                destRanges = [];
            for (const key in sourceRanges) {
                destRanges[key] = sourceRanges[key];
            }
            return destRanges;
        }