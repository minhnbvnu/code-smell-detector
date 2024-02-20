function segmentify(line, segment, j) {
    if (j === 4)
      line.push([segment[0], segment[1], segment[2], segment[3]]);
    else if (j === 5)
      line.push([segment[0], segment[1], segment[2], segment[3], segment[4]]);
    else if (j === 1)
      line.push([segment[0]]);
  }