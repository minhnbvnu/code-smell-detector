function Raycaster(origin, direction, near, far) {

  this.ray = new Ray(origin, direction);
  // direction is assumed to be normalized (for accurate distance calculations)

  this.near = near || 0;
  this.far = far || Infinity;

  this.params = {
    Mesh: {},
    Line: {},
    LOD: {},
    Points: { threshold: 1 },
    Sprite: {}
  };

  Object.defineProperties(this.params, {
    PointCloud: {
      get: function() {

        console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.');
        return this.Points;

      }
    }
  });

}