function tile(tileGrid) {
  return (
    /**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {import("./proj.js").Projection} projection Projection.
     * @return {Array<import("./extent.js").Extent>} Extents.
     */
    function (extent, resolution, projection) {
      const z = tileGrid.getZForResolution(
        fromUserResolution(resolution, projection),
      );
      const tileRange = tileGrid.getTileRangeForExtentAndZ(
        fromUserExtent(extent, projection),
        z,
      );
      /** @type {Array<import("./extent.js").Extent>} */
      const extents = [];
      /** @type {import("./tilecoord.js").TileCoord} */
      const tileCoord = [z, 0, 0];
      for (
        tileCoord[1] = tileRange.minX;
        tileCoord[1] <= tileRange.maxX;
        ++tileCoord[1]
      ) {
        for (
          tileCoord[2] = tileRange.minY;
          tileCoord[2] <= tileRange.maxY;
          ++tileCoord[2]
        ) {
          extents.push(
            toUserExtent(tileGrid.getTileCoordExtent(tileCoord), projection),
          );
        }
      }
      return extents;
    }
  );
}