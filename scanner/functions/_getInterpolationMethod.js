function _getInterpolationMethod(options) {
  if (options.stepped) {
    return _steppedInterpolation;
  }

  if (options.tension || options.cubicInterpolationMode === 'monotone') {
    return _bezierInterpolation;
  }

  return _pointInLine;
}