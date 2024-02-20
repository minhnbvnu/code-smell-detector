async function fetchFile(url, options) {
    if (typeof url === "string") {
      url = resolvePath(url);
      let fetchOptions = options;
      if (options?.fetch && typeof options?.fetch !== "function") {
        fetchOptions = options.fetch;
      }
      return await fetch(url, fetchOptions);
    }
    return await makeResponse(url);
  }