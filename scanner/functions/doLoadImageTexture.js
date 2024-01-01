function doLoadImageTexture (resolve, reject) {
    var isEl = typeof src !== 'string';

    function resolveTexture (texture) {
      setTextureProperties(texture, data);
      texture.needsUpdate = true;
      resolve(texture);
    }

    // Create texture from an element.
    if (isEl) {
      resolveTexture(new THREE.Texture(src));
      return;
    }

    // Request and load texture from src string. THREE will create underlying element.
    // Use THREE.TextureLoader (src, onLoad, onProgress, onError) to load texture.
    TextureLoader.load(
      src,
      resolveTexture,
      function () { /* no-op */ },
      function (xhr) {
        error('`$s` could not be fetched (Error code: %s; Response: %s)', xhr.status,
              xhr.statusText);
      }
    );
  }