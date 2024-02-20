function loadLidarData(data) {
  const binary = readBinaryData(data);
  const float = new Float32Array(binary);
  const size = Math.round(binary.length / 4);

  // We could return interleaved buffers, no conversion!
  const positions = new Array(size);
  const colors = new Array(size);

  for (let i = 0; i < size; i++) {
    positions[i] = float.subarray(i * 4, i * 4 + 3);

    const reflectance = Math.min(float[i * 4 + 3], 3);
    colors[i] = [80 + reflectance * 80, reflectance * 80, reflectance * 60];
  }
  return {positions, colors};
}