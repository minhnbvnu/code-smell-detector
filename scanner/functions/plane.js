function plane(coords) {
  c.set(0, 0, 0);
  for (let i = 0; i < coords.length; i += 3) {
    c.x += coords[i];
    c.y += coords[i + 1];
    c.z += coords[i + 2];
  }
  c.multiplyScalar(1 / (coords.length / 3));
  const d = c.clone().normalize().multiplyScalar(r);
  //d.set(0, 0, 0);
  c.add(d);
  //node(c.x, c.y, c.z);

  for (let i = 0; i < coords.length; i += 3) {
    a.x = coords[i] + d.x;
    a.y = coords[i + 1] + d.y;
    a.z = coords[i + 2] + d.z;
    b.x = coords[(i + 3) % coords.length] + d.x;
    b.y = coords[(i + 4) % coords.length] + d.y;
    b.z = coords[(i + 5) % coords.length] + d.z;
    triangle(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  }
}