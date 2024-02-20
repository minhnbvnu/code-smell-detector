function testWriter(t, testCase, Writer, suffix) {
  const sink = new MemorySourceSink();
  const writer = new Writer(sink, testCase.options);

  if (testCase.preTest) {
    testCase.preTest(t, testCase, writer, sink);
  }

  let lookup = null;
  let resultType = null;
  if (testCase.type === 'm') {
    lookup = '1-frame';
    resultType = 'metadata';
    writer.writeMetadata(testCase.data);
  } else if (testCase.type === 'f') {
    lookup = '2-frame';
    resultType = 'state_update';
    writer.writeMessage(0, testCase.data);
  } else {
    t.fail('Unknown testCase type');
  }

  t.ok(sink.has(`${lookup}.${suffix}`), `wrote json data ${lookup}.${suffix}`);
  const jsMessage = new XVIZData(sink.readSync(`${lookup}.${suffix}`)).message();
  t.deepEquals(jsMessage.data, testCase.data, 'data matches');
  t.deepEquals(jsMessage.type, resultType, 'type matches');

  if (testCase.postTest) {
    testCase.postTest(t, testCase, writer, sink);
  }
}