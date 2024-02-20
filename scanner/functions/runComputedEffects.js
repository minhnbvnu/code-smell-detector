function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
    let computeEffects = inst[TYPES.COMPUTE];
    if (computeEffects) {
      let inputProps = changedProps;
      while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
        Object.assign(oldProps, inst.__dataOld);
        Object.assign(changedProps, inst.__dataPending);
        inputProps = inst.__dataPending;
        inst.__dataPending = null;
      }
    }
  }