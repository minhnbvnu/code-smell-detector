function MeshPhongMaterial(parameters) {

  Material.call(this);

  this.type = 'MeshPhongMaterial';

  this.color = new Color(0xffffff); // diffuse
  this.specular = new Color(0x111111);
  this.shininess = 30;

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