function bump(x, y, z, seed) {
  return noise.perlin3(x + seed, y, z);
}