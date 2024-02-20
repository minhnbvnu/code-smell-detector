function testWriterThrows(t, testCase, Writer) {
  const sink = new MemorySourceSink();
  const writer = new Writer(sink, testCase.options);

  if (testCase.preTest) {
    testCase.preTest(t, testCase, writer, sink);
  }

  t.throws(
    () => writer.writeMessage(0, testCase.data),
    testCase.exceptionRegex,
    testCase.testMessage
  );

  if (testCase.postTest) {
    testCase.postTest(t, testCase, writer, sink);
  }
}