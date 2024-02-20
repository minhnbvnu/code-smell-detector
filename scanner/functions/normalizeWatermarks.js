function normalizeWatermarks(specified = {}) {
    Object.entries(watermarks.getDefault()).forEach(([k, value]) => {
        const specValue = specified[k];
        if (!Array.isArray(specValue) || specValue.length !== 2) {
            specified[k] = value;
        }
    });

    return specified;
}