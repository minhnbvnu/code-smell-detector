function Enum(...options) {
  return Object.fromEntries(options.map((key, i) => [key, BigInt(i)]));
}