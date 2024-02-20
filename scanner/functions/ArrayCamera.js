function ArrayCamera(array) {

  PerspectiveCamera.call(this);

  this.cameras = array || [];

}