function action(target, key, descriptor) {
  const act = descriptor.value;
  descriptor.value = function (...args) {
    this.setState.call(this, act.call(this, ...args));
  }
  return descriptor;
}