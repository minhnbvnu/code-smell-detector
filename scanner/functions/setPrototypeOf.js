function setPrototypeOf(target, proto) {
  // tslint:disable-next-line
  if (typeof Object.setPrototypeOf !== 'undefined') {
    Object.setPrototypeOf(target, proto); // tslint:disable-line
  } else {
    target.__proto__ = proto;
  }
}