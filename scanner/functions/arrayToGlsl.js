function arrayToGlsl(array) {
  if (array.length < 2 || array.length > 4) {
    throw new Error(
      '`formatArray` can only output `vec2`, `vec3` or `vec4` arrays.',
    );
  }
  return `vec${array.length}(${array.map(numberToGlsl).join(', ')})`;
}