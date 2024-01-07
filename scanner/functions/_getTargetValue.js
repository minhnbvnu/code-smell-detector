function _getTargetValue(fill, scale, startValue) {
  let value;

  if (fill === 'start') {
    value = startValue;
  } else if (fill === 'end') {
    value = scale.options.reverse ? scale.min : scale.max;
  } else if (isObject(fill)) {
    // @ts-ignore
    value = fill.value;
  } else {
    value = scale.getBaseValue();
  }
  return value;
}