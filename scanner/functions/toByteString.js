function toByteString(x) {
  return x.map(singleToByteString).join("");
}