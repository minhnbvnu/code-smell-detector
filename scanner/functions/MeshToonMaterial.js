function MeshToonMaterial(parameters) {

  MeshPhongMaterial.call(this);

  this.defines = { 'TOON': '' };

  this.type = 'MeshToonMaterial';

  this.gradientMap = null;

  this.setValues(parameters);

}