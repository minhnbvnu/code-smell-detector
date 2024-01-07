function AsyncStep({text, ms}) {
  if (!cache.has(text)) {
    throw new Promise(resolve =>
      setTimeout(() => {
        cache.add(text);
        resolve();
      }, ms)
    );
  }
  return null;
}