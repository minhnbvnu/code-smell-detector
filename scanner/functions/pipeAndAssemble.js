async function pipeAndAssemble(inputChunks, encoding, ignoreBOM) {
      const chunksAsUint8 = inputChunks.map(values => new Uint8Array(values));
      const readable = readableStreamFromArray(chunksAsUint8);
      const outputArray = await readableStreamToArray(readable.pipeThrough(
        new TextDecoderStream(encoding, { ignoreBOM })));
      return outputArray.join('');
    }