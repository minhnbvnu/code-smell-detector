function isArrayBuffer(v) {
  return typeof v === "object" && v !== null && v.byteLength !== undefined;
}