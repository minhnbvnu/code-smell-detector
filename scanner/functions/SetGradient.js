function SetGradient(c, l, o, g) {
  var gd = c.createLinearGradient(0, 0, l, 0), i;
  for(i in g)
    gd.addColorStop(1 - i, g[i]);
  c.fillStyle = gd;
  c.fillRect(0, o, l, 1);
}