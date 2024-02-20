function readCRS(json) {
    if (json.crs) {
        if (json.crs.type.toLowerCase() == 'epsg') {
            return `EPSG:${json.crs.properties.code}`;
        } else if (json.crs.type.toLowerCase() == 'name') {
            if (json.crs.properties.name.toLowerCase().includes('epsg:')) {
                // OGC CRS URN: urn:ogc:def:crs:authority:version:code => EPSG:[...]:code
                // legacy identifier: authority:code => EPSG:code
                const codeStart = json.crs.properties.name.lastIndexOf(':');
                if (codeStart > 0) {
                    return `EPSG:${json.crs.properties.name.substr(codeStart + 1)}`;
                }
            }
            throw new Error(`Unsupported CRS authority '${json.crs.properties.name}'`);
        }
        throw new Error(`Unsupported CRS type '${json.crs}'`);
    }
    // assume default crs
    return 'EPSG:4326';
}