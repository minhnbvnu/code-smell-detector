function simulatePaste(elem) {
    const pasteEvent = new Event('paste', {
      bubbles: true,
    });
    pasteEvent.clipboardData = {
      dropEffect: null,
      effectAllowed: null,
      files: null,
      items: null,
      types: null,
    };
    elem.dispatchEvent(pasteEvent);
  }