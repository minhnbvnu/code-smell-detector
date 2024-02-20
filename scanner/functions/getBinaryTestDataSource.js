function getBinaryTestDataSource() {
  const source = new MemorySourceSink();
  source.writeSync('0-frame.json', index);
  source.writeSync('1-frame.glb', metadata);
  source.writeSync('2-frame.glb', msg1);
  source.writeSync('3-frame.glb', msg2);

  return source;
}