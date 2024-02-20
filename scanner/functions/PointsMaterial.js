function PointsMaterial(parameters) {

  Material.call(this);

  this.type = 'PointsMaterial';

  this.color = new Color(0xffffff);

  this.map = null;

  this.size = 1;
  this.sizeAttenuation = true;

  this.morphTargets = false;

  this.lights = false;

  this.setValues(parameters);

}