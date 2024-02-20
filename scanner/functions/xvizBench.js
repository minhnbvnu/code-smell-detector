function xvizBench(bench) {
  return bench
    .group('XVIZ STREAM BUFFER')
    .add('XVIZStreamBuffer#insert 1000 frames into unlimited buffer', () => {
      const timeslice = generateTimeslice(50);
      let timestamp = 1;
      const TIMESLICE_COUNT = 1000;
      const streamBuffer = new XVIZStreamBuffer();

      for (let i = 0; i < TIMESLICE_COUNT; i++) {
        streamBuffer.insert({...timeslice, timestamp});
        timestamp++;
      }
    })
    .add('XVIZStreamBuffer#insert 1000 frames into limited buffer', () => {
      const timeslice = generateTimeslice(50);
      let timestamp = 1;
      const TIMESLICE_COUNT = 1000;
      const streamBuffer = new XVIZStreamBuffer({startOffset: -150, endOffset: 10});

      for (let i = 0; i < TIMESLICE_COUNT; i++) {
        streamBuffer.setCurrentTime(timestamp);
        streamBuffer.insert({...timeslice, timestamp});
        timestamp++;
      }
    })
    .add('XVIZStreamBuffer#insert 1000 frames into limited buffer + getStreams', () => {
      const timeslice = generateTimeslice(50);
      let timestamp = 1;
      const TIMESLICE_COUNT = 1000;
      const streamBuffer = new XVIZStreamBuffer({startOffset: -150, endOffset: 10});

      for (let i = 0; i < TIMESLICE_COUNT; i++) {
        streamBuffer.setCurrentTime(timestamp);
        streamBuffer.insert({...timeslice, timestamp});
        streamBuffer.getStreams();
        timestamp++;
      }
    });
}