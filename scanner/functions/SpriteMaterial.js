function SpriteMaterial(parameters) {

  Material.call(this);

  this.type = 'SpriteMaterial';

  this.color = new Color(0xffffff);
  this.map = null;

  this.rotation = 0;

  this.sizeAttenuation = true;

  this.lights = false;
  this.transparent = true;

  this.setValues(parameters);

}