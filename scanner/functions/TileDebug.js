constructor(options) {
    /**
     * @type {Options}
     */
    options = options || {};

    super({
      opaque: false,
      projection: options.projection,
      tileGrid: options.tileGrid,
      wrapX: options.wrapX !== undefined ? options.wrapX : true,
      zDirection: options.zDirection,
      url: options.template || 'z:{z} x:{x} y:{y}',
      tileLoadFunction: (tile, text) => {
        const z = tile.getTileCoord()[0];
        const tileSize = toSize(this.tileGrid.getTileSize(z));
        const context = createCanvasContext2D(tileSize[0], tileSize[1]);

        context.strokeStyle = 'grey';
        context.strokeRect(0.5, 0.5, tileSize[0] + 0.5, tileSize[1] + 0.5);

        context.fillStyle = 'grey';
        context.strokeStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = '24px sans-serif';
        context.lineWidth = 4;
        context.strokeText(text, tileSize[0] / 2, tileSize[1] / 2, tileSize[0]);
        context.fillText(text, tileSize[0] / 2, tileSize[1] / 2, tileSize[0]);

        /** @type {import("../ImageTile.js").default} */ (tile).setImage(
          context.canvas,
        );
      },
    });
  }