function GLTFDracoMeshCompressionExtension(json, dracoLoader) {

  if (!dracoLoader) {

    throw new Error('THREE.GLTFLoader: No DRACOLoader instance provided.');

  }

  this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
  this.json = json;
  this.dracoLoader = dracoLoader;
  THREE.DRACOLoader.getDecoderModule();

}