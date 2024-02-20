function LightShadow(camera) {

  this.camera = camera;

  this.bias = 0;
  this.radius = 1;

  this.mapSize = new Vector2(512, 512);

  this.map = null;
  this.matrix = new Matrix4();

}