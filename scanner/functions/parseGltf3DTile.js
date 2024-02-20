async function parseGltf3DTile(tile, arrayBuffer, options, context) {
    tile.rotateYtoZ = true;
    tile.gltfUpAxis = options["3d-tiles"] && options["3d-tiles"].assetGltfUpAxis ? options["3d-tiles"].assetGltfUpAxis : "Y";
    const { parse: parse5 } = context;
    tile.gltf = await parse5(arrayBuffer, GLTFLoader, options, context);
  }