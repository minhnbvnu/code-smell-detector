async function parse4(data, options, context) {
    const loaderOptions = options["3d-tiles"] || {};
    let isTileset;
    if (loaderOptions.isTileset === "auto") {
      isTileset = context.url && context.url.indexOf(".json") !== -1;
    } else {
      isTileset = loaderOptions.isTileset;
    }
    if (isTileset) {
      data = await parseTileset(data, options, context);
    } else {
      data = await parseTile(data, options, context);
    }
    return data;
  }