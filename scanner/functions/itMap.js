function* itMap(it, f) {
  for (let t of it) {
    yield f(t);
  }
}