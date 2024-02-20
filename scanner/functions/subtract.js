function subtract(simpleRange, complexRange) {
  if (!isValid(simpleRange)) {
    return empty();
  }

  const result = [];
  let r1 = simpleRange;

  for (let j = 0; j < complexRange.length; j++) {
    const r2 = complexRange[j];

    if (r1[0] >= r2[1]) {
      //    [   ]
      // [ ]
      continue; // eslint-disable-line
    }
    if (r2[0] >= r1[1]) {
      // [   ]
      //      [ ]
      break;
    }
    if (r2[0] > r1[0]) {
      // [    ]
      //   [   ]
      result.push([r1[0], r2[0]]);
    }
    if (r2[1] < r1[1]) {
      // [    ]
      //   [ ]
      r1 = [r2[1], r1[1]];
    } else {
      // [    ]
      //   [  ]
      r1 = null;
      break;
    }
  }
  if (r1) {
    result.push(r1);
  }
  return result;
}