function BufferAttribute(array, itemSize, normalized) {

  if (Array.isArray(array)) {

    throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');

  }

  this.name = '';

  this.array = array;
  this.itemSize = itemSize;
  this.count = array !== undefined ? array.length / itemSize : 0;
  this.normalized = normalized === true;

  this.dynamic = false;
  this.updateRange = { offset: 0, count: -1 };

  this.version = 0;

}