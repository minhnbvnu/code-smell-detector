function BufferGeometry() {

  Object.defineProperty(this, 'id', { value: bufferGeometryId += 2 });

  this.uuid = _Math.generateUUID();

  this.name = '';
  this.type = 'BufferGeometry';

  this.index = null;
  this.attributes = {};

  this.morphAttributes = {};

  this.groups = [];

  this.boundingBox = null;
  this.boundingSphere = null;

  this.drawRange = { start: 0, count: Infinity };

  this.userData = {};

}