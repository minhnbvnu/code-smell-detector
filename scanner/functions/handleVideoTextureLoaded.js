function handleVideoTextureLoaded (result) {
      result.texture.needsUpdate = true;
      cb(result.texture, result.videoEl);
    }