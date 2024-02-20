function lazyStyleInterpolator(result, value) {
    if (interpolator === null) {
      interpolator = Function(createFunctionString(anims))();
    }
    return interpolator(result, value);
  }