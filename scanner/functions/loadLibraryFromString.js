function loadLibraryFromString(scriptSource, id) {
    if (!isBrowser2) {
      return node.requireFromString && node.requireFromString(scriptSource, id);
    }
    if (isWorker) {
      eval.call(global_2, scriptSource);
      return null;
    }
    const script = document.createElement("script");
    script.id = id;
    try {
      script.appendChild(document.createTextNode(scriptSource));
    } catch (e) {
      script.text = scriptSource;
    }
    document.body.appendChild(script);
    return null;
  }