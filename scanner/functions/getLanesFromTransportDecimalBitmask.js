function getLanesFromTransportDecimalBitmask(laneBitmaskString) {
  const laneBitmask = parseInt(laneBitmaskString, 10); // As negative numbers are stored in two's complement format, our bitmask
  // checks will be thrown off by them.

  if (laneBitmask < 0) {
    return [];
  }

  const lanes = [];
  let powersOfTwo = 0;

  while (powersOfTwo <= src_constants["a" /* REACT_TOTAL_NUM_LANES */]) {
    if (1 << powersOfTwo & laneBitmask) {
      lanes.push(powersOfTwo);
    }

    powersOfTwo++;
  }

  return lanes;
}