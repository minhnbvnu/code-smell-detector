function getSegments(extent) {
  return [
    [
      [extent[0], extent[1]],
      [extent[0], extent[3]],
    ],
    [
      [extent[0], extent[3]],
      [extent[2], extent[3]],
    ],
    [
      [extent[2], extent[3]],
      [extent[2], extent[1]],
    ],
    [
      [extent[2], extent[1]],
      [extent[0], extent[1]],
    ],
  ];
}