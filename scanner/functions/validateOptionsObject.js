function validateOptionsObject(options, id, defaultOptions, deprecatedOptions, loaders) {
    const loaderName = id || "Top level";
    const prefix = id ? `${id}.` : "";
    for (const key in options) {
      const isSubOptions = !id && isObject(options[key]);
      const isBaseUriOption = key === "baseUri" && !id;
      const isWorkerUrlOption = key === "workerUrl" && id;
      if (!(key in defaultOptions) && !isBaseUriOption && !isWorkerUrlOption) {
        if (key in deprecatedOptions) {
          probeLog.warn(`${loaderName} loader option '${prefix}${key}' no longer supported, use '${deprecatedOptions[key]}'`)();
        } else if (!isSubOptions) {
          const suggestion = findSimilarOption(key, loaders);
          probeLog.warn(`${loaderName} loader option '${prefix}${key}' not recognized. ${suggestion}`)();
        }
      }
    }
  }