function ArrayBridge(array) {
  if ("number" === typeof array) {
    array = init_seq([], array);
  } else if ("string" === typeof array) {
    array = copy_string([], array);
  } else if (Buffer.isBuffer(array) || (HAS_UINT8ARRAY && (array instanceof Uint8Array))) {
    array = copy_array([], array);
  }

  return array;
}