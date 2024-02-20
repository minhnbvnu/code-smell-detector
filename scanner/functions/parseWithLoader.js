async function parseWithLoader(loader, data, options, context) {
    validateWorkerVersion(loader);
    data = await getArrayBufferOrStringFromData(data, loader, options);
    if (loader.parseTextSync && typeof data === "string") {
      options.dataType = "text";
      return loader.parseTextSync(data, options, context, loader);
    }
    if (canParseWithWorker(loader, options)) {
      return await parseWithWorker(loader, data, options, context, parse);
    }
    if (loader.parseText && typeof data === "string") {
      return await loader.parseText(data, options, context, loader);
    }
    if (loader.parse) {
      return await loader.parse(data, options, context, loader);
    }
    assert3(!loader.parseSync);
    throw new Error(`${loader.id} loader - no parser found and worker is disabled`);
  }