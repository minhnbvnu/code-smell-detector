function GLTFTextureDDSExtension() {

  if (!THREE.DDSLoader) {

    throw new Error('THREE.GLTFLoader: Attempting to load .dds texture without importing THREE.DDSLoader');

  }

  this.name = EXTENSIONS.MSFT_TEXTURE_DDS;
  this.ddsLoader = new THREE.DDSLoader();

}