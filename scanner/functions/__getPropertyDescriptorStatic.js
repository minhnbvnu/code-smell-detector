function __getPropertyDescriptorStatic(obj, prop) {
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
    if (descriptor) return { descriptor, dynamic: false };
    proto = Object.getPrototypeOf(proto);
  }
  return null;
}