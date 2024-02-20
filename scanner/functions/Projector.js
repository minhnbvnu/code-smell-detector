function Projector() {

  console.error('THREE.Projector has been moved to /examples/js/renderers/Projector.js.');

  this.projectVector = function(vector, camera) {

    console.warn('THREE.Projector: .projectVector() is now vector.project().');
    vector.project(camera);

  };

  this.unprojectVector = function(vector, camera) {

    console.warn('THREE.Projector: .unprojectVector() is now vector.unproject().');
    vector.unproject(camera);

  };

  this.pickingRay = function() {

    console.error('THREE.Projector: .pickingRay() is now raycaster.setFromCamera().');

  };

}