function loadTexture (src) {
  return new Promise(function (resolve, reject) {
    new THREE.ImageLoader().load(src, function (image) {
      resolve(image);
    }, undefined, function () {
      error('Error loading font image', src);
      reject(null);
    });
  });
}