function getLineMethod(options) {
  if (options.stepped) {
    return _steppedLineTo;
  }

  if (options.tension || options.cubicInterpolationMode === 'monotone') {
    return _bezierCurveTo;
  }

  return lineTo;
}