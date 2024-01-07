function handlePaintSolidColorImageMask(iFirstSave, count, fnArray, argsArray) {
    const iFirstPIMXO = iFirstSave + 2;
    let i;

    for (i = 0; i < count; i++) {
      const arg = argsArray[iFirstPIMXO + 4 * i];
      const imageMask = arg.length === 1 && arg[0];

      if (imageMask && imageMask.width === 1 && imageMask.height === 1 && (!imageMask.data.length || imageMask.data.length === 1 && imageMask.data[0] === 0)) {
        fnArray[iFirstPIMXO + 4 * i] = _util.OPS.paintSolidColorImageMask;
        continue;
      }

      break;
    }

    return count - i;
  }