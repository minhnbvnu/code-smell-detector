function generateTimeslice(streamsCount) {
  const streams = {};

  for (let i = 0; i < streamsCount; i++) {
    const streamName = `stream-${i}`;
    streams[streamName] = {};
  }

  return {
    vehiclePose: {longitude: 0, latitude: 0, x: 0, y: 0, z: 0},
    streams
  };
}