function MeshMatcapMaterial(parameters) {

  Material.call(this);

  this.defines = { 'MATCAP': '' };

  this.type = 'MeshMatcapMaterial';

  this.color = new Color(0xffffff); // diffuse

  this.matcap = null;

  this.map = null;

  this.bumpMap = null;
  this.bumpScale = 1;

  this.normalMap = null;
  this.normalMapType = TangentSpaceNormalMap;
  this.normalScale = new Vector2(1, 1);

  this.displacementMap = null;
  this.displacementScale = 1;
  this.displacementBias = 0;

  this.alphaMap = null;

  this.skinning = false;
  this.morphTargets = false;
  this.morphNormals = false;

  this.lights = false;

  this.setValues(parameters);

  // a matcap is required

  if (this.matcap === null) {

    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    var context = canvas.getContext('2d');

    context.fillStyle = '#fff';
    context.fillRect(0, 0, 1, 1);

    this.matcap = new THREE.CanvasTexture(canvas);

  }

}