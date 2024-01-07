function _decodeFill(line, index, count) {
  /** @type {string | {value: number}} */
  const fill = parseFillOption(line);

  if (isObject(fill)) {
    return isNaN(fill.value) ? false : fill;
  }

  let target = parseFloat(fill);

  if (isFinite(target) && Math.floor(target) === target) {
    return decodeTargetIndex(fill[0], index, target, count);
  }

  return ['origin', 'start', 'end', 'stack', 'shape'].indexOf(fill) >= 0 && fill;
}