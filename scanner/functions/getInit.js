function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}