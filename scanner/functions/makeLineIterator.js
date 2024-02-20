async function* makeLineIterator(textIterator) {
    let previous = "";
    for await (const textChunk of textIterator) {
      previous += textChunk;
      let eolIndex;
      while ((eolIndex = previous.indexOf("\n")) >= 0) {
        const line = previous.slice(0, eolIndex + 1);
        previous = previous.slice(eolIndex + 1);
        yield line;
      }
    }
    if (previous.length > 0) {
      yield previous;
    }
  }