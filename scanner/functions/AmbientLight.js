function AmbientLight(color, intensity) {

  Light.call(this, color, intensity);

  this.type = 'AmbientLight';

  this.castShadow = undefined;

}