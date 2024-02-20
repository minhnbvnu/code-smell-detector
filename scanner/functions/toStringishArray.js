function toStringishArray(value) {
  let array;
  switch (true) {
    default:
      if (isObject(value)) {
        if (Array.isArray(value)) {
          array = value;break;
        }
        if (Symbol.iterator in value) {
          array = Array.from(value);break;
        }
      }
      array = [value];
  }
  return array.map(primToStringish);
}