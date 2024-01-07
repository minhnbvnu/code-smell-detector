function genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap) {
    const hasBackdrop = !!backdrop;
    const r0 = hasBackdrop ? backdrop[0] : 0;
    const g0 = hasBackdrop ? backdrop[1] : 0;
    const b0 = hasBackdrop ? backdrop[2] : 0;
    let composeFn;

    if (subtype === "Luminosity") {
      composeFn = composeSMaskLuminosity;
    } else {
      composeFn = composeSMaskAlpha;
    }

    const PIXELS_TO_PROCESS = 1048576;
    const chunkSize = Math.min(height, Math.ceil(PIXELS_TO_PROCESS / width));

    for (let row = 0; row < height; row += chunkSize) {
      const chunkHeight = Math.min(chunkSize, height - row);
      const maskData = maskCtx.getImageData(0, row, width, chunkHeight);
      const layerData = layerCtx.getImageData(0, row, width, chunkHeight);

      if (hasBackdrop) {
        composeSMaskBackdrop(maskData.data, r0, g0, b0);
      }

      composeFn(maskData.data, layerData.data, transferMap);
      maskCtx.putImageData(layerData, 0, row);
    }
  }