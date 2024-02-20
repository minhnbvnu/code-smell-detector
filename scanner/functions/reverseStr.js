function reverseStr(str = "") {
  return str.split("").reduceRight((t, v) => t + v);
}