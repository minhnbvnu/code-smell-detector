async function* parseNDJSONInBatches(binaryAsyncIterator, options) {
    const textIterator = makeTextDecoderIterator(binaryAsyncIterator);
    const lineIterator = makeLineIterator(textIterator);
    const numberedLineIterator = makeNumberedLineIterator(lineIterator);
    const schema = null;
    const shape = "row-table";
    const tableBatchBuilder = new TableBatchBuilder(schema, {
      ...options,
      shape
    });
    for await (const { counter, line } of numberedLineIterator) {
      try {
        const row = JSON.parse(line);
        tableBatchBuilder.addRow(row);
        tableBatchBuilder.chunkComplete(line);
        const batch2 = tableBatchBuilder.getFullBatch();
        if (batch2) {
          yield batch2;
        }
      } catch (error) {
        throw new Error(`NDJSONLoader: failed to parse JSON on line ${counter}`);
      }
    }
    const batch = tableBatchBuilder.getFinalBatch();
    if (batch) {
      yield batch;
    }
  }