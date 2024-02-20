function MeshLambertMaterial(parameters) {

  Material.call(this);

  this.type = 'MeshLambertMaterial';

  this.color = new Color(0xffffff); // diffuse

  this.map = null;

  this.lightMap = null;
  this.lightMapIntensity = 1.0;

  this.aoMap = null;
  this.aoMapIntensity = 1.0;

  this.emissive = new Color(0x000000);
  this.emissiveIntensity = 1.0;
  this.emissiveMap = null;

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
  this.morphNormals = false;

  this.setValues(parameters);

}