async function renderWorld(projection) {
  const world = JSON.parse(await readFile("./node_modules/world-atlas/world/50m.json"));
  const canvas = new Canvas(width, height);
  const graticule = geoGraticule();
  const sphere = {type: "Sphere"};
  const context = canvas.getContext("2d");
  const path = geoPath(projection, context);
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.save();
  context.beginPath();
  path(feature(world, world.objects.land));
  context.fillStyle = "#000";
  context.fill();
  context.beginPath();
  path(graticule());
  context.strokeStyle = "rgba(119,119,119,0.5)";
  context.stroke();
  context.restore();
  context.beginPath();
  path(sphere);
  context.strokeStyle = "#000";
  context.stroke();
  return canvas;
}