function createFromTemplate(template, tileGrid) {
  const zRegEx = /\{z\}/g;
  const xRegEx = /\{x\}/g;
  const yRegEx = /\{y\}/g;
  const dashYRegEx = /\{-y\}/g;
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function (tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return undefined;
      }
      return template
        .replace(zRegEx, tileCoord[0].toString())
        .replace(xRegEx, tileCoord[1].toString())
        .replace(yRegEx, tileCoord[2].toString())
        .replace(dashYRegEx, function () {
          const z = tileCoord[0];
          const range = tileGrid.getFullTileRange(z);
          if (!range) {
            throw new Error(
              'The {-y} placeholder requires a tile grid with extent',
            );
          }
          const y = range.getHeight() - tileCoord[2] - 1;
          return y.toString();
        });
    }
  );
}