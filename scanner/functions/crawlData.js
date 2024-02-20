function crawlData(data, sources, resolvedStyles) {
  if (data == null) {
    return;
  }

  if (Object(isArray["a" /* default */])(data)) {
    data.forEach(entry => {
      if (entry == null) {
        return;
      }

      if (Object(isArray["a" /* default */])(entry)) {
        crawlData(entry, sources, resolvedStyles);
      } else {
        crawlObjectProperties(entry, sources, resolvedStyles);
      }
    });
  } else {
    crawlObjectProperties(data, sources, resolvedStyles);
  }

  resolvedStyles = Object.fromEntries(Object.entries(resolvedStyles).sort());
}