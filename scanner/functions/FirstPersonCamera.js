function FirstPersonCamera(opts) {
  if (!(this instanceof FirstPersonCamera)) return new FirstPersonCamera(opts)
  opts = opts || {}
  this.position = opts.position || vec3.create()
  this.rotation = opts.rotation || vec3.create()
  this.positionSpeed = opts.positionSpeed || -.5
  this.rotationSpeed = opts.rotationSpeed || .01
}