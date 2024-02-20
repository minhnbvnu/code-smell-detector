function MeshDistanceMaterial(parameters) {

  Material.call(this);

  this.type = 'MeshDistanceMaterial';

  this.referencePosition = new Vector3();
  this.nearDistance = 1;
  this.farDistance = 1000;

  this.skinning = false;
  this.morphTargets = false;

  this.map = null;

  this.alphaMap = null;

  this.displacementMap = null;
  this.displacementScale = 1;
  this.displacementBias = 0;

  this.fog = false;
  this.lights = false;

  this.setValues(parameters);

}