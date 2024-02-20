function growMountains(p, mountains, hexColor) {
  const c = p.color(hexColor);

  new Array(5).fill(1).map((_, i) => {
    const a = 255 - 50 * i;
    c.setAlpha(a);
    const h = p.height - 50 * i;
    const m = new Mountain(c, h, p);
    mountains.push(m);
  });
}