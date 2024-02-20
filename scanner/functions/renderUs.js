async function renderUs(projection) {
  const us = JSON.parse(await readFile("./test/data/us-10m.json"));
  const canvas = new Canvas(width, height);
  const context = canvas.getContext("2d");
  const path = geoPath(projection, context);
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.beginPath();
  path(feature(us, us.objects.land));
  context.fillStyle = "#000";
  context.fill();
  context.beginPath();
  path(mesh(us, us.objects.counties, (a, b) => a !== b && !(a.id / 1000 ^ b.id / 1000)));
  context.lineWidth = 0.5;
  context.strokeStyle = "#fff";
  context.stroke();
  context.beginPath();
  path(mesh(us, us.objects.states, (a, b) => a !== b));
  context.lineWidth = 1;
  context.strokeStyle = "#fff";
  context.stroke();
  return canvas;
}