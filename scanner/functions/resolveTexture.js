function resolveTexture (texture) {
      setTextureProperties(texture, data);
      texture.needsUpdate = true;
      resolve(texture);
    }