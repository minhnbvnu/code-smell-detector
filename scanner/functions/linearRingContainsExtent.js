function linearRingContainsExtent(
  flatCoordinates,
  offset,
  end,
  stride,
  extent,
) {
  const outside = forEachCorner(
    extent,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function (coordinate) {
      return !linearRingContainsXY(
        flatCoordinates,
        offset,
        end,
        stride,
        coordinate[0],
        coordinate[1],
      );
    },
  );
  return !outside;
}