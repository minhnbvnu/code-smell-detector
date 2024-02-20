function outerBorder(a, seed, spread) {
  const f = 3;
  const r = .5;
  return Maf.PI / 8 + spread * noise.perlin2(r * Math.cos(f * a) + seed, r * Math.sin(f * a));
}