function getTileMatrixSet(TileMatrixSets, TileMatrixSetLink) {
    for (let i = 0; i < TileMatrixSets.length; i++) {
        let TileMatrixSet = TileMatrixSets[i];
        TileMatrixSet = TileMatrixSet.getElementsByTagName('ows:Identifier')[0];
        if (TileMatrixSet) {
            if (TileMatrixSet.textContent === TileMatrixSetLink) {
                return TileMatrixSets[i];
            }
        }
    }
    return null;
}