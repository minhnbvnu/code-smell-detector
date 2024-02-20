function turbulence(x, y, z) {

  let w = 100.0;
  let t = -.5;

  for (let f = 1.0; f <= 10.0; f++) {
    let power = Math.pow(2.0, f);
    t += Math.abs(noise.perlin3(x * power, y * power, z * power));
  }

  return t;

}