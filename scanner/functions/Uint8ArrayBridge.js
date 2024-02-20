function Uint8ArrayBridge(array) {
  if ("number" === typeof array) {
    array = init_seq(new Uint8Array(array), array);
  } else if ("string" === typeof array) {
    array = copy_string(new Uint8Array(array.length), array);
  } else if (Buffer.isBuffer(array)) {
    array = copy_array(new Uint8Array(array.length), array);
  } else {
    array = new Uint8Array(array);
  }

  return array;
}