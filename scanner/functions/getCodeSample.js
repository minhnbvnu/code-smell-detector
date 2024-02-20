function getCodeSample(streamNames) {
  let metadata = `// metadata
xvizMetadataBuilder
  .startTime(1000)
  .endTime(1005)

  .stream('/vehicle_pose')
  .category('POSE')
`;
  let frame = `// frame
const timestamp = 1000;

xvizBuilder
  .pose('/vehicle_pose')
  .timestamp(timestamp)
  .mapOrigin(-122.4, 37.8, 0)
  .orientation(0, 0, 0)
`;
  for (const streamName of streamNames) {
    if (streamName in streamMetadata) {
      metadata += streamMetadata[streamName];
      frame += `\nxvizBuilder${streamSample[streamName]}`;
    }
  }

  return {metadata, frame};
}