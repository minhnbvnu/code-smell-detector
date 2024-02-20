function MeshBasicMaterial(parameters) {

  Material.call(this);

  this.type = 'MeshBasicMaterial';

  this.color = new Color(0xffffff); // emissive

  this.map = null;

  this.lightMap = null;
  this.lightMapIntensity = 1.0;

  this.aoMap = null;
  this.aoMapIntensity = 1.0;

  this.specularMap = null;

  this.alphaMap = null;

  this.envMap = null;
  this.combine = MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;

  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.wireframeLinecap = 'round';
  this.wireframeLinejoin = 'round';

  this.skinning = false;
  this.morphTargets = false;

  this.lights = false;

  this.setValues(parameters);

}