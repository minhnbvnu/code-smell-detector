function getCountTiles(crs, zoom) {
    const sTs = schemeTiles.get(CRS.formatToTms(crs)) || schemeTiles.get('default');
    const count = 2 ** zoom;
    _countTiles.set(count, count).multiply(sTs);
    return _countTiles;
}