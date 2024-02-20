function DirectionalLight(color, intensity) {

  Light.call(this, color, intensity);

  this.type = 'DirectionalLight';

  this.position.copy(Object3D.DefaultUp);
  this.updateMatrix();

  this.target = new Object3D();

  this.shadow = new DirectionalLightShadow();

}