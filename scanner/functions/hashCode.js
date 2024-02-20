function hashCode(string) {
  // Hash algorithm for substrings is described in "Über die Komplexität der Multiplikation in
  // eingeschränkten Branchingprogrammmodellen" by Woelfe.
  // http://opendatastructures.org/versions/edition-0.1d/ods-java/node33.html#SECTION00832000000000000000
  const p = (1 << 30) * 4 - 5; // prime: 2^32 - 5

  const z = 0x5033d967; // 32 bits from random.org

  const z2 = 0x59d2f15d; // random odd 32 bit number

  let s = 0;
  let zi = 1;

  for (let i = 0; i < string.length; i++) {
    const xi = string.charCodeAt(i) * z2;
    s = (s + zi * xi) % p;
    zi = zi * z % p;
  }

  s = (s + zi * (p - 1)) % p;
  return Math.abs(s | 0);
}