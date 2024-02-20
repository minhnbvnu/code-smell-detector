function MeshPhysicalMaterial(parameters) {

  MeshStandardMaterial.call(this);

  this.defines = { 'PHYSICAL': '' };

  this.type = 'MeshPhysicalMaterial';

  this.reflectivity = 0.5; // maps to F0 = 0.04

  this.clearCoat = 0.0;
  this.clearCoatRoughness = 0.0;

  this.setValues(parameters);

}