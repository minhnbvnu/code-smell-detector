function MeshDepthMaterial(parameters) {

  Material.call(this);

  this.type = 'MeshDepthMaterial';

  this.depthPacking = BasicDepthPacking;

  this.skinning = false;
  this.morphTargets = false;

  this.map = null;

  this.alphaMap = null;

  this.displacementMap = null;
  this.displacementScale = 1;
  this.displacementBias = 0;

  this.wireframe = false;
  this.wireframeLinewidth = 1;

  this.fog = false;
  this.lights = false;

  this.setValues(parameters);

}