function runBox2D() {
  var world = MakeNewWorld();
  for (var i = 0; i < 20; i++) {
    world.Step(1 / 60, 10, 3);
  }
}