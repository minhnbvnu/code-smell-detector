function HitTest (renderer, hitTestSourceDetails) {
  this.renderer = renderer;
  this.xrHitTestSource = null;

  renderer.xr.addEventListener('sessionend', function () {
    this.xrHitTestSource = null;
  }.bind(this));
  renderer.xr.addEventListener('sessionstart', function () {
    this.sessionStart(hitTestSourceDetails);
  }.bind(this));

  if (this.renderer.xr.isPresenting) {
    this.sessionStart(hitTestSourceDetails);
  }
}