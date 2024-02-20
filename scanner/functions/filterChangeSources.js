function filterChangeSources(updateSources, geometryLayer) {
    let fullUpdate = false;
    const filtered = new Set();
    updateSources.forEach((src) => {
        if (src === geometryLayer || src.isCamera) {
            geometryLayer.info.clear();
            fullUpdate = true;
        } else if (src.layer === geometryLayer) {
            filtered.add(src);
        }
    });
    return fullUpdate ? new Set([geometryLayer]) : filtered;
}