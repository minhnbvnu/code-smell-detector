function flushMounts() {
  var c;

  while (c = mounts.pop()) {
    if (options.afterMount) options.afterMount(c);
    if (c.componentDidMount) c.componentDidMount();
  }
}