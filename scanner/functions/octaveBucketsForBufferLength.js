function octaveBucketsForBufferLength(bufferLength) {
  const octaveBuckets = new Array(NUM_BARS).fill(0);
  const minHz = 200;
  const maxHz = 22050;
  const octaveStep = Math.pow(maxHz / minHz, 1 / NUM_BARS);
  octaveBuckets[0] = 0;
  octaveBuckets[1] = minHz;

  for (let i = 2; i < NUM_BARS - 1; i++) {
    octaveBuckets[i] = octaveBuckets[i - 1] * octaveStep;
  }

  octaveBuckets[NUM_BARS - 1] = maxHz;

  for (let i = 0; i < NUM_BARS; i++) {
    const octaveIdx = Math.floor(octaveBuckets[i] / maxHz * bufferLength);
    octaveBuckets[i] = octaveIdx;
  }

  return octaveBuckets;
}