function getJSONTestDataSource() {
  const source = new MemorySourceSink();
  source.writeSync('0-frame.json', index);
  source.writeSync('1-frame.json', metadata);
  source.writeSync('2-frame.json', msg1);
  source.writeSync('3-frame.json', msg2);

  return source;
}