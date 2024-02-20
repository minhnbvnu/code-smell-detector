async function* fetchLineGenerator(url, signal) {
  const reader = await fetchBodyReader(url, null, { signal });

  const readerDecoder = makeReaderDecoder('utf-8', reader);
  let { text: buffer, done } = await readerDecoder();

  while (true) {
    const firstNewlineIndex = buffer.indexOf('\n');
    if (firstNewlineIndex === -1) {
      // If no new line
      if (done) {
        // No more data.
        yield buffer.length > 0
          ? buffer
          : null;

        break;
      } else {
        // If reader isn't done, read more
        let text;
        // eslint-disable-next-line no-await-in-loop
        ({ text, done } = await readerDecoder());
        buffer += text;
      }
    } else {
      // If we found a new line
      yield buffer.substring(0, firstNewlineIndex);
      buffer = buffer.substr(firstNewlineIndex + 1);
    }
  }
}