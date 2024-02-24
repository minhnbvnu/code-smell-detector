function MeshStandardMaterial(parameters) {

  Material.call(this);

  this.defines = { 'STANDARD': '' };

  this.type = 'MeshStandardMaterial';

  this.color = new Color(0xffffff); // diffuse
  this.roughness = 0.5;
  this.metalness = 0.5;

  this.map = null;

  this.lightMap = null;
  this.lightMapIntensity = 1.0;

  this.aoMap = null;
  this.aoMapIntensity = 1.0;

  this.emissive = new Color(0x000000);
  this.emissiveIntensity = 1.0;
  this.emissiveMap = null;

  this.bumpMap = null;
  this.bumpScale = 1;

  this.normalMap = null;
  this.normalMapType = TangentSpaceNormalMap;
  this.normalScale = new Vector2(1, 1);

  this.displacementMap = null;
  this.displacementScale = 1;
  this.displacementBias = 0;

  this.roughnessMap = null;

  this.metalnessMap = null;

  this.alphaMap = null;

  this.envMap = null;
  this.envMapIntensity = 1.0;

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