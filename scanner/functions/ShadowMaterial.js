function ShadowMaterial(parameters) {

  Material.call(this);

  this.type = 'ShadowMaterial';

  this.color = new Color(0x000000);
  this.transparent = true;

  this.setValues(parameters);

}