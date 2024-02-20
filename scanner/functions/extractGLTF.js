async function extractGLTF(tile, gltfFormat, options, context) {
    const tile3DOptions = options["3d-tiles"] || {};
    extractGLTFBufferOrURL(tile, gltfFormat, options);
    if (tile3DOptions.loadGLTF) {
      const { parse: parse5, fetch: fetch2 } = context;
      if (tile.gltfUrl) {
        tile.gltfArrayBuffer = await fetch2(tile.gltfUrl, options);
        tile.gltfByteOffset = 0;
      }
      if (tile.gltfArrayBuffer) {
        tile.gltf = await parse5(tile.gltfArrayBuffer, GLTFLoader, options, context);
        delete tile.gltfArrayBuffer;
        delete tile.gltfByteOffset;
        delete tile.gltfByteLength;
      }
    }
  }