function InterleavedBuffer(array, stride) {

  this.array = array;
  this.stride = stride;
  this.count = array !== undefined ? array.length / stride : 0;

  this.dynamic = false;
  this.updateRange = { offset: 0, count: -1 };

  this.version = 0;

}