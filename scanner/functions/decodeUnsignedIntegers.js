function decodeUnsignedIntegers(encoded) {
  const numbers = [];
  let current = 0;
  let shift = 0;
  for (let i = 0, ii = encoded.length; i < ii; ++i) {
    const b = encoded.charCodeAt(i) - 63;
    current |= (b & 0x1f) << shift;
    if (b < 0x20) {
      numbers.push(current);
      current = 0;
      shift = 0;
    } else {
      shift += 5;
    }
  }
  return numbers;
}