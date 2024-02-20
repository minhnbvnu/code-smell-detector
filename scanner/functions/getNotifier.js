function getNotifier(source) {
    let found = source.$fastController || notifierLookup.get(source);

    if (found === void 0) {
      if (Array.isArray(source)) {
        found = createArrayObserver(source);
      } else {
        notifierLookup.set(source, found = new PropertyChangeNotifier(source));
      }
    }

    return found;
  }