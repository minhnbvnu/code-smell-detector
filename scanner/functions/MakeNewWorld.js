function MakeNewWorld () {
  var Vec2 = Box2D.Common.Math.b2Vec2,
      BodyDef = Box2D.Dynamics.b2BodyDef,
      Body = Box2D.Dynamics.b2Body,
      FixtureDef = Box2D.Dynamics.b2FixtureDef,
      Fixture = Box2D.Dynamics.b2Fixture,
      World = Box2D.Dynamics.b2World,
      MassData = Box2D.Collision.Shapes.b2MassData,
      PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      CircleShape = Box2D.Collision.Shapes.b2CircleShape;

  var gravity = new Vec2(0, -10);
  var world = new World(gravity, true);

  var shape = new PolygonShape();
  shape.SetAsEdge(new Vec2(-40.0, 0), new Vec2(40.0, 0));

  var fd = new FixtureDef();
  fd.density = 0.0;
  fd.shape = shape;
  var bd = new BodyDef();
  var ground = world.CreateBody(bd);
  ground.CreateFixture(fd);

  var a = .5;
  var shape = new PolygonShape();
  shape.SetAsBox(a, a);

  var x = new Vec2(-7.0, 0.75);
  var y = new Vec2();
  var deltaX = new Vec2(0.5625, 1);
  var deltaY = new Vec2(1.125, 0.0);

  for (var i = 0; i < 10; ++i) {
    y.Set(x.x, x.y);

    for (var j = 0; j < 5; ++j) {
      var fd = new FixtureDef();
      fd.density = 5.0;
      fd.shape = shape;

      var bd = new BodyDef();
      bd.type = Body.b2_dynamicBody;
      bd.position.Set(y.x, y.y);
      var body = world.CreateBody(bd);
      body.CreateFixture(fd);
      y.Add(deltaY);
    }

    x.Add(deltaX);
  }

  return world;
}