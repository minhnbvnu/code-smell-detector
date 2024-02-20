function entriesFor(obj) {
  let entries = ENTRIES.get(obj);

  if (entries === undefined) {
    entries = new WeakMap();
    ENTRIES.set(obj, entries);
  }

  return entries;
}