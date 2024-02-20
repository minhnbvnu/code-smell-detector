function StereoCamera() {

  this.type = 'StereoCamera';

  this.aspect = 1;

  this.eyeSep = 0.064;

  this.cameraL = new PerspectiveCamera();
  this.cameraL.layers.enable(1);
  this.cameraL.matrixAutoUpdate = false;

  this.cameraR = new PerspectiveCamera();
  this.cameraR.layers.enable(2);
  this.cameraR.matrixAutoUpdate = false;

}