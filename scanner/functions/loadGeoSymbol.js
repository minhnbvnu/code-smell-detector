function loadGeoSymbol(symbol, geo) {
    return loadFunctionTypes(symbol, () => {
        const map = geo.getMap();
        return set(arr, map ? map.getZoom() : 12,
            extend({},
                geo.getProperties(),
                setProp(prop, map && map.getBearing() || 0, map && map.getPitch() || 0, map ? map.getZoom() : 10)
            )
        );
    });
}