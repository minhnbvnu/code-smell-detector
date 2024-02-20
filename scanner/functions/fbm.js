function fbm(x, y, z) {
  let value = 0.;
  let amplitude = 1.;
  for (let i = 0; i < 8; i++) {
    value += amplitude * Math.abs(noise.perlin3(x, y, z));
    x *= 2.;
    y *= 2.;
    z *= 2.;
    amplitude *= .5;
  }
  return 2 * squareTurbulence(.3 + value) - 1;
}