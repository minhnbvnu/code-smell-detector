function OrthographicCamera(left, right, top, bottom, near, far) {

  Camera.call(this);

  this.type = 'OrthographicCamera';

  this.zoom = 1;
  this.view = null;

  this.left = (left !== undefined) ? left : -1;
  this.right = (right !== undefined) ? right : 1;
  this.top = (top !== undefined) ? top : 1;
  this.bottom = (bottom !== undefined) ? bottom : -1;

  this.near = (near !== undefined) ? near : 0.1;
  this.far = (far !== undefined) ? far : 2000;

  this.updateProjectionMatrix();

}