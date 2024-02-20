async function* makeNumberedLineIterator(lineIterator) {
    let counter = 1;
    for await (const line of lineIterator) {
      yield { counter, line };
      counter++;
    }
  }