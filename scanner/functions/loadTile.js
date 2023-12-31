function loadTile(tile) {
    const tileSize = this.layer.getTileSize(),
        canvasClass = this.canvas.constructor,
        map = this.getMap();
    const r = map.getDevicePixelRatio();
    const tileCanvas = Canvas2D.createCanvas(tileSize['width'] * r, tileSize['height'] * r, canvasClass);
    tileCanvas['layer'] = this.layer;
    const me = this;
    const point = new Point(tile['extent2d'].xmin, tile['extent2d'].ymax);
    const extent = new Extent(map.pointToCoordinate(point), map.pointToCoordinate(point.add(tileSize.width, tileSize.height)), map.getProjection());
    this.layer.drawTile(tileCanvas, {
        'url': tile['url'],
        'point': point,
        'center' : map.pointToCoordinate(point.add(tileSize['width'] / 2, tileSize['height'] / 2)),
        'extent' : extent,
        'z': tile['z'],
        'x' : tile['x'],
        'y' : tile['y']
    }, error => {
        if (error) {
            me.onTileError(tileCanvas, tile);
            return;
        }
        me.onTileLoad(tileCanvas, tile);
    });
    return tileCanvas;
}