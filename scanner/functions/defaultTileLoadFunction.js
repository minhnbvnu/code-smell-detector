function defaultTileLoadFunction(imageTile, src) {
  /** @type {HTMLImageElement|HTMLVideoElement} */ (imageTile.getImage()).src =
    src;
}