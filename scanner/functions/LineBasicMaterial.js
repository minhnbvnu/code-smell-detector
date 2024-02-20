function LineBasicMaterial(parameters) {

  Material.call(this);

  this.type = 'LineBasicMaterial';

  this.color = new Color(0xffffff);

  this.linewidth = 1;
  this.linecap = 'round';
  this.linejoin = 'round';

  this.lights = false;

  this.setValues(parameters);

}