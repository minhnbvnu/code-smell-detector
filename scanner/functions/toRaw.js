function toRaw(observed) {
  return observed && toRaw(observed["__v_raw"]) || observed;
}