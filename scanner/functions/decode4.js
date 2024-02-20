async function decode4(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    const extension = gltfScenegraph.getExtension(KHR_LIGHTS_PUNCTUAL);
    if (extension) {
      gltfScenegraph.json.lights = extension.lights;
      gltfScenegraph.removeExtension(KHR_LIGHTS_PUNCTUAL);
    }
    for (const node2 of json.nodes || []) {
      const nodeExtension = gltfScenegraph.getObjectExtension(node2, KHR_LIGHTS_PUNCTUAL);
      if (nodeExtension) {
        node2.light = nodeExtension.light;
      }
      gltfScenegraph.removeObjectExtension(node2, KHR_LIGHTS_PUNCTUAL);
    }
  }