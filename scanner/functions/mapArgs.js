function mapArgs(fn, mapFn) {
  return (...args) => fn(...args.map(mapFn));
}