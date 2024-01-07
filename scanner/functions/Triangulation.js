constructor(
    sourceProj,
    targetProj,
    targetExtent,
    maxSourceExtent,
    errorThreshold,
    destinationResolution,
  ) {
    /**
     * @type {import("../proj/Projection.js").default}
     * @private
     */
    this.sourceProj_ = sourceProj;

    /**
     * @type {import("../proj/Projection.js").default}
     * @private
     */
    this.targetProj_ = targetProj;

    /** @type {!Object<string, import("../coordinate.js").Coordinate>} */
    let transformInvCache = {};
    const transformInv = getTransform(this.targetProj_, this.sourceProj_);

    /**
     * @param {import("../coordinate.js").Coordinate} c A coordinate.
     * @return {import("../coordinate.js").Coordinate} Transformed coordinate.
     * @private
     */
    this.transformInv_ = function (c) {
      const key = c[0] + '/' + c[1];
      if (!transformInvCache[key]) {
        transformInvCache[key] = transformInv(c);
      }
      return transformInvCache[key];
    };

    /**
     * @type {import("../extent.js").Extent}
     * @private
     */
    this.maxSourceExtent_ = maxSourceExtent;

    /**
     * @type {number}
     * @private
     */
    this.errorThresholdSquared_ = errorThreshold * errorThreshold;

    /**
     * @type {Array<Triangle>}
     * @private
     */
    this.triangles_ = [];

    /**
     * Indicates that the triangulation crosses edge of the source projection.
     * @type {boolean}
     * @private
     */
    this.wrapsXInSource_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.canWrapXInSource_ =
      this.sourceProj_.canWrapX() &&
      !!maxSourceExtent &&
      !!this.sourceProj_.getExtent() &&
      getWidth(maxSourceExtent) >= getWidth(this.sourceProj_.getExtent());

    /**
     * @type {?number}
     * @private
     */
    this.sourceWorldWidth_ = this.sourceProj_.getExtent()
      ? getWidth(this.sourceProj_.getExtent())
      : null;

    /**
     * @type {?number}
     * @private
     */
    this.targetWorldWidth_ = this.targetProj_.getExtent()
      ? getWidth(this.targetProj_.getExtent())
      : null;

    const destinationTopLeft = getTopLeft(targetExtent);
    const destinationTopRight = getTopRight(targetExtent);
    const destinationBottomRight = getBottomRight(targetExtent);
    const destinationBottomLeft = getBottomLeft(targetExtent);
    const sourceTopLeft = this.transformInv_(destinationTopLeft);
    const sourceTopRight = this.transformInv_(destinationTopRight);
    const sourceBottomRight = this.transformInv_(destinationBottomRight);
    const sourceBottomLeft = this.transformInv_(destinationBottomLeft);

    /*
     * The maxSubdivision controls how many splittings of the target area can
     * be done. The idea here is to do a linear mapping of the target areas
     * but the actual overall reprojection (can be) extremely non-linear. The
     * default value of MAX_SUBDIVISION was chosen based on mapping a 256x256
     * tile size. However this function is also called to remap canvas rendered
     * layers which can be much larger. This calculation increases the maxSubdivision
     * value by the right factor so that each 256x256 pixel area has
     * MAX_SUBDIVISION divisions.
     */
    const maxSubdivision =
      MAX_SUBDIVISION +
      (destinationResolution
        ? Math.max(
            0,
            Math.ceil(
              Math.log2(
                getArea(targetExtent) /
                  (destinationResolution * destinationResolution * 256 * 256),
              ),
            ),
          )
        : 0);

    this.addQuad_(
      destinationTopLeft,
      destinationTopRight,
      destinationBottomRight,
      destinationBottomLeft,
      sourceTopLeft,
      sourceTopRight,
      sourceBottomRight,
      sourceBottomLeft,
      maxSubdivision,
    );

    if (this.wrapsXInSource_) {
      let leftBound = Infinity;
      this.triangles_.forEach(function (triangle, i, arr) {
        leftBound = Math.min(
          leftBound,
          triangle.source[0][0],
          triangle.source[1][0],
          triangle.source[2][0],
        );
      });

      // Shift triangles to be as close to `leftBound` as possible
      // (if the distance is more than `worldWidth / 2` it can be closer.
      this.triangles_.forEach((triangle) => {
        if (
          Math.max(
            triangle.source[0][0],
            triangle.source[1][0],
            triangle.source[2][0],
          ) -
            leftBound >
          this.sourceWorldWidth_ / 2
        ) {
          const newTriangle = [
            [triangle.source[0][0], triangle.source[0][1]],
            [triangle.source[1][0], triangle.source[1][1]],
            [triangle.source[2][0], triangle.source[2][1]],
          ];
          if (newTriangle[0][0] - leftBound > this.sourceWorldWidth_ / 2) {
            newTriangle[0][0] -= this.sourceWorldWidth_;
          }
          if (newTriangle[1][0] - leftBound > this.sourceWorldWidth_ / 2) {
            newTriangle[1][0] -= this.sourceWorldWidth_;
          }
          if (newTriangle[2][0] - leftBound > this.sourceWorldWidth_ / 2) {
            newTriangle[2][0] -= this.sourceWorldWidth_;
          }

          // Rarely (if the extent contains both the dateline and prime meridian)
          // the shift can in turn break some triangles.
          // Detect this here and don't shift in such cases.
          const minX = Math.min(
            newTriangle[0][0],
            newTriangle[1][0],
            newTriangle[2][0],
          );
          const maxX = Math.max(
            newTriangle[0][0],
            newTriangle[1][0],
            newTriangle[2][0],
          );
          if (maxX - minX < this.sourceWorldWidth_ / 2) {
            triangle.source = newTriangle;
          }
        }
      });
    }

    transformInvCache = {};
  }