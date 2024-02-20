function ImageBitmapLoader(manager) {

  if (typeof createImageBitmap === 'undefined') {

    console.warn('THREE.ImageBitmapLoader: createImageBitmap() not supported.');

  }

  if (typeof fetch === 'undefined') {

    console.warn('THREE.ImageBitmapLoader: fetch() not supported.');

  }

  this.manager = manager !== undefined ? manager : DefaultLoadingManager;
  this.options = undefined;

}