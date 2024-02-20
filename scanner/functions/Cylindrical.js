function Cylindrical(radius, theta, y) {

  this.radius = (radius !== undefined) ? radius : 1.0; // distance from the origin to a point in the x-z plane
  this.theta = (theta !== undefined) ? theta : 0; // counterclockwise angle in the x-z plane measured in radians from the positive z-axis
  this.y = (y !== undefined) ? y : 0; // height above the x-z plane

  return this;

}