function PerspectiveCamera(fov, aspect, near, far) {

  Camera.call(this);

  this.type = 'PerspectiveCamera';

  this.fov = fov !== undefined ? fov : 50;
  this.zoom = 1;

  this.near = near !== undefined ? near : 0.1;
  this.far = far !== undefined ? far : 2000;
  this.focus = 10;

  this.aspect = aspect !== undefined ? aspect : 1;
  this.view = null;

  this.filmGauge = 35; // width of the film (default in millimeters)
  this.filmOffset = 0; // horizontal film offset (same unit as gauge)

  this.updateProjectionMatrix();

}