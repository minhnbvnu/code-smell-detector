function HemisphereLight(skyColor, groundColor, intensity) {

  Light.call(this, skyColor, intensity);

  this.type = 'HemisphereLight';

  this.castShadow = undefined;

  this.position.copy(Object3D.DefaultUp);
  this.updateMatrix();

  this.groundColor = new Color(groundColor);

}