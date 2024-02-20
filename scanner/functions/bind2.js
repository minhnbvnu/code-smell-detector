function bind2(name, object) {
  binds[name] = typeof object !== "function" ? () => object : object;
}