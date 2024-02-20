function LineDashedMaterial(parameters) {

  LineBasicMaterial.call(this);

  this.type = 'LineDashedMaterial';

  this.scale = 1;
  this.dashSize = 3;
  this.gapSize = 1;

  this.setValues(parameters);

}