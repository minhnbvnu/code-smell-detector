function FogExp2(color, density) {

  this.name = '';

  this.color = new Color(color);
  this.density = (density !== undefined) ? density : 0.00025;

}