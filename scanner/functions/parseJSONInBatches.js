async function* parseJSONInBatches(binaryAsyncIterator, options) {
    const asyncIterator = makeTextDecoderIterator(binaryAsyncIterator);
    const { metadata } = options;
    const { jsonpaths } = options.json || {};
    let isFirstChunk = true;
    const schema = null;
    const shape = options?.json?.shape || "row-table";
    const tableBatchBuilder = new TableBatchBuilder(schema, {
      ...options,
      shape
    });
    const parser = new StreamingJSONParser({ jsonpaths });
    for await (const chunk of asyncIterator) {
      const rows = parser.write(chunk);
      const jsonpath2 = rows.length > 0 && parser.getStreamingJsonPathAsString();
      if (rows.length > 0 && isFirstChunk) {
        if (metadata) {
          const initialBatch = {
            shape,
            batchType: "partial-result",
            data: [],
            length: 0,
            bytesUsed: 0,
            container: parser.getPartialResult(),
            jsonpath: jsonpath2
          };
          yield initialBatch;
        }
        isFirstChunk = false;
      }
      for (const row of rows) {
        tableBatchBuilder.addRow(row);
        const batch3 = tableBatchBuilder.getFullBatch({ jsonpath: jsonpath2 });
        if (batch3) {
          yield batch3;
        }
      }
      tableBatchBuilder.chunkComplete(chunk);
      const batch2 = tableBatchBuilder.getFullBatch({ jsonpath: jsonpath2 });
      if (batch2) {
        yield batch2;
      }
    }
    const jsonpath = parser.getStreamingJsonPathAsString();
    const batch = tableBatchBuilder.getFinalBatch({ jsonpath });
    if (batch) {
      yield batch;
    }
    if (metadata) {
      const finalBatch = {
        shape,
        batchType: "final-result",
        container: parser.getPartialResult(),
        jsonpath: parser.getStreamingJsonPathAsString(),
        data: [],
        length: 0
      };
      yield finalBatch;
    }
  }