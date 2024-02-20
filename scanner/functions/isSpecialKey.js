function isSpecialKey(key, type) {
    if (key === 'type') return true;
    else if (type === 'FeatureCollection') {
        if (key === 'features') return true;
    } else if (type === 'Feature') {
        if (key === 'id' || key === 'properties' || key === 'geometry') return true;
    } else if (type === 'GeometryCollection') {
        if (key === 'geometries') return true;
    } else if (key === 'coordinates') return true;
    return false;
}