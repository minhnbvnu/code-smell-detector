function xhr(url, format) {
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("./proj/Projection.js").default} projection Projection.
   * @param {function(Array<import("./Feature.js").default>): void} [success] Success
   *      Function called when loading succeeded.
   * @param {function(): void} [failure] Failure
   *      Function called when loading failed.
   */
  return function (extent, resolution, projection, success, failure) {
    const source = /** @type {import("./source/Vector").default} */ (this);
    loadFeaturesXhr(
      url,
      format,
      extent,
      resolution,
      projection,
      /**
       * @param {Array<import("./Feature.js").default>} features The loaded features.
       * @param {import("./proj/Projection.js").default} dataProjection Data
       * projection.
       */
      function (features, dataProjection) {
        source.addFeatures(features);
        if (success !== undefined) {
          success(features);
        }
      },
      /* FIXME handle error */ failure ? failure : VOID,
    );
  };
}