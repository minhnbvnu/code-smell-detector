function innerBorder(a, seed, spread) {
  return Maf.PI - Maf.PI / 8 + spread * .5 * noise.perlin2(1 * Math.cos(a) + seed, 1 * Math.sin(a));
}