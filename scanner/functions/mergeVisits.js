function mergeVisits(visits) {
    let merged = {};
    for (const visit of visits) {
        for (const [dimension, typesWithCount] of Object.entries(visit)) {
            for (const [type, count] of Object.entries(typesWithCount)) {
                if (!(dimension in merged)) {
                    merged[dimension] = {};
                }
                if (!(type in merged[dimension])) {
                    merged[dimension][type] = 0;
                }
                merged[dimension][type] += count;
            }
        }
    }
    return merged;
}