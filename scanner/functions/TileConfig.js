constructor(map, tileSystem, fullExtent, tileSize) {
        this.map = map;
        this.tileSize = tileSize;
        this.fullExtent = fullExtent;
        this.prepareTileInfo(tileSystem, fullExtent);
        this._xScale = fullExtent['right'] >= fullExtent['left'] ? 1 : -1;
        this._yScale = fullExtent['top'] >= fullExtent['bottom'] ? 1 : -1;
        const glRes = map.getGLRes();
        this._pointOrigin = map._prjToPointAtRes(new Point(this.tileSystem['origin']), glRes);
        this._glRes = glRes;
    }