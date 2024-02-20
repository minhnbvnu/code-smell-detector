function parseCSVInBatches(asyncIterator, options) {
    options = { ...options };
    if (options.batchSize === "auto") {
      options.batchSize = 4e3;
    }
    const csvOptions = { ...DEFAULT_CSV_LOADER_OPTIONS.csv, ...options?.csv };
    const asyncQueue = new AsyncQueue();
    let isFirstRow = true;
    let headerRow = null;
    let tableBatchBuilder = null;
    let schema = null;
    const config = {
      ...csvOptions,
      header: false,
      download: false,
      chunkSize: 1024 * 1024 * 5,
      skipEmptyLines: false,
      step(results) {
        let row = results.data;
        if (csvOptions.skipEmptyLines) {
          const collapsedRow = row.flat().join("").trim();
          if (collapsedRow === "") {
            return;
          }
        }
        const bytesUsed = results.meta.cursor;
        if (isFirstRow && !headerRow) {
          const header = csvOptions.header === "auto" ? isHeaderRow(row) : Boolean(csvOptions.header);
          if (header) {
            headerRow = row.map(duplicateColumnTransformer());
            return;
          }
        }
        if (isFirstRow) {
          isFirstRow = false;
          if (!headerRow) {
            headerRow = generateHeader(csvOptions.columnPrefix, row.length);
          }
          schema = deduceSchema(row, headerRow);
        }
        if (csvOptions.optimizeMemoryUsage) {
          row = JSON.parse(JSON.stringify(row));
        }
        tableBatchBuilder = tableBatchBuilder || new TableBatchBuilder(schema, {
          shape: csvOptions.shape || "array-row-table",
          ...options
        });
        try {
          tableBatchBuilder.addRow(row);
          const batch = tableBatchBuilder && tableBatchBuilder.getFullBatch({ bytesUsed });
          if (batch) {
            asyncQueue.enqueue(batch);
          }
        } catch (error) {
          asyncQueue.enqueue(error);
        }
      },
      complete(results) {
        try {
          const bytesUsed = results.meta.cursor;
          const batch = tableBatchBuilder && tableBatchBuilder.getFinalBatch({ bytesUsed });
          if (batch) {
            asyncQueue.enqueue(batch);
          }
        } catch (error) {
          asyncQueue.enqueue(error);
        }
        asyncQueue.close();
      }
    };
    papaparse_default.parse(asyncIterator, config, AsyncIteratorStreamer);
    return asyncQueue;
  }