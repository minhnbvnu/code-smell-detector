function InstancedBufferAttribute(array, itemSize, normalized, meshPerAttribute) {

  if (typeof(normalized) === 'number') {

    meshPerAttribute = normalized;

    normalized = false;

    console.error('THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.');

  }

  BufferAttribute.call(this, array, itemSize, normalized);

  this.meshPerAttribute = meshPerAttribute || 1;

}