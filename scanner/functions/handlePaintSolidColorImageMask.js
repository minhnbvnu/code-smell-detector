function handlePaintSolidColorImageMask(iFirstSave, count, fnArray,
                                          argsArray) {
    // Handles special case of mainly LaTeX documents which use image masks to
    // draw lines with the current fill style.
    // 'count' groups of (save, transform, paintImageMaskXObject, restore)+
    // have been found at iFirstSave.
    var iFirstPIMXO = iFirstSave + 2;
    for (var i = 0; i < count; i++) {
      var arg = argsArray[iFirstPIMXO + 4 * i];
      var imageMask = arg.length === 1 && arg[0];
      if (imageMask && imageMask.width === 1 && imageMask.height === 1 &&
          (!imageMask.data.length ||
           (imageMask.data.length === 1 && imageMask.data[0] === 0))) {
        fnArray[iFirstPIMXO + 4 * i] = OPS.paintSolidColorImageMask;
        continue;
      }
      break;
    }
    return count - i;
  }