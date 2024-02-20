function replaceContext() {
      if (isContextReplaced) return;
      p.loadPixels();
      if (proxyContext === null) {
        originalContext = curContext;
        proxyContext = new SetPixelContextWrapper
      }
      isContextReplaced = true;
      curContext = proxyContext;
      setPixelsCached = 0
    }