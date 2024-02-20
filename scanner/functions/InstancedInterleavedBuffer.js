function InstancedInterleavedBuffer(array, stride, meshPerAttribute) {

  InterleavedBuffer.call(this, array, stride);

  this.meshPerAttribute = meshPerAttribute || 1;

}