function Spherical(radius, phi, theta) {

  this.radius = (radius !== undefined) ? radius : 1.0;
  this.phi = (phi !== undefined) ? phi : 0; // polar angle
  this.theta = (theta !== undefined) ? theta : 0; // azimuthal angle

  return this;

}