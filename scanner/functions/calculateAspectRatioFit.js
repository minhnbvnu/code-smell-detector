function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
      // credit: https://stackoverflow.com/a/14731922
      var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      return { w: Math.round(srcWidth*ratio), h: Math.round(srcHeight*ratio) };
   }