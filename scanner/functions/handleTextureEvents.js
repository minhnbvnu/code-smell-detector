function handleTextureEvents (el, texture) {
  if (!texture) { return; }

  el.emit('materialtextureloaded', {src: texture.image, texture: texture});

  // Video events.
  if (!texture.image || texture.image.tagName !== 'VIDEO') { return; }

  texture.image.addEventListener('loadeddata', function emitVideoTextureLoadedDataAll () {
    // Check to see if we need to use iOS 10 HLS shader.
    // Only override the shader if it is stock shader that we know doesn't correct.
    if (!el.components || !el.components.material) { return; }

    if (texture.needsCorrectionBGRA && texture.needsCorrectionFlipY &&
        ['standard', 'flat'].indexOf(el.components.material.data.shader) !== -1) {
      el.setAttribute('material', 'shader', 'ios10hls');
    }

    el.emit('materialvideoloadeddata', {src: texture.image, texture: texture});
  });
  texture.image.addEventListener('ended', function emitVideoTextureEndedAll () {
    // Works for non-looping videos only.
    el.emit('materialvideoended', {src: texture.image, texture: texture});
  });
}