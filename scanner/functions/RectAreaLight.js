function RectAreaLight(color, intensity, width, height) {

  Light.call(this, color, intensity);

  this.type = 'RectAreaLight';

  this.width = (width !== undefined) ? width : 10;
  this.height = (height !== undefined) ? height : 10;

}