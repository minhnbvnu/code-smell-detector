constructor(coordinates, layout, ends) {
    super();

    /**
     * @type {Array<number>}
     * @private
     */
    this.ends_ = [];

    /**
     * @private
     * @type {number}
     */
    this.maxDelta_ = -1;

    /**
     * @private
     * @type {number}
     */
    this.maxDeltaRevision_ = -1;

    if (Array.isArray(coordinates[0])) {
      this.setCoordinates(
        /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */ (
          coordinates
        ),
        layout,
      );
    } else if (layout !== undefined && ends) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */ (coordinates),
      );
      this.ends_ = ends;
    } else {
      const lineStrings = /** @type {Array<LineString>} */ (coordinates);
      /** @type {Array<number>} */
      const flatCoordinates = [];
      const ends = [];
      for (let i = 0, ii = lineStrings.length; i < ii; ++i) {
        const lineString = lineStrings[i];
        extend(flatCoordinates, lineString.getFlatCoordinates());
        ends.push(flatCoordinates.length);
      }
      const layout =
        lineStrings.length === 0
          ? this.getLayout()
          : lineStrings[0].getLayout();
      this.setFlatCoordinates(layout, flatCoordinates);
      this.ends_ = ends;
    }
  }