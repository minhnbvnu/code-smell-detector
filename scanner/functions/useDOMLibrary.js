function useDOMLibrary(library) {
  if (typeof library === 'function') {
    dom.$ = library;
  } else {
    dom.$ = mq;
  }
}