function Fog(color, near, far) {

  this.name = '';

  this.color = new Color(color);

  this.near = (near !== undefined) ? near : 1;
  this.far = (far !== undefined) ? far : 1000;

}