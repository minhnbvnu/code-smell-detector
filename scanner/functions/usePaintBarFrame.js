function usePaintBarFrame({
  renderHeight,
  height,
  analyser
}) {
  const [barPeaks] = Object(react["useState"])(() => new Array(NUM_BARS).fill(0));
  const [barPeakFrames] = Object(react["useState"])(() => new Array(NUM_BARS).fill(0));
  const bufferLength = analyser.frequencyBinCount;
  const octaveBuckets = Object(react["useMemo"])(() => {
    return octaveBucketsForBufferLength(bufferLength);
  }, [bufferLength]);
  const dataArray = Object(react["useMemo"])(() => {
    return new Uint8Array(bufferLength);
  }, [bufferLength]);
  const paintBar = usePaintBar({
    height,
    renderHeight
  });
  return Object(react["useCallback"])(canvasCtx => {
    analyser.getByteFrequencyData(dataArray);
    const heightMultiplier = renderHeight / 256;
    const xOffset = BAR_WIDTH + useBarVisualizer_PIXEL_DENSITY; // Bar width, plus a pixel of spacing to the right.

    for (let j = 0; j < NUM_BARS - 1; j++) {
      const start = octaveBuckets[j];
      const end = octaveBuckets[j + 1];
      let amplitude = 0;

      for (let k = start; k < end; k++) {
        amplitude += dataArray[k];
      }

      amplitude /= end - start; // The drop rate should probably be normalized to the rendering FPS, for now assume 60 FPS

      let barPeak = barPeaks[j] - BAR_PEAK_DROP_RATE * Math.pow(barPeakFrames[j], 2);

      if (barPeak < amplitude) {
        barPeak = amplitude;
        barPeakFrames[j] = 0;
      } else {
        barPeakFrames[j] += 1;
      }

      barPeaks[j] = barPeak;
      paintBar(canvasCtx, j * xOffset, amplitude * heightMultiplier, barPeak * heightMultiplier);
    }
  }, [analyser, barPeakFrames, barPeaks, dataArray, octaveBuckets, paintBar, renderHeight]);
}