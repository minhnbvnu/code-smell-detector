async function decode6(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    const extension = gltfScenegraph.getExtension(KHR_TECHNIQUES_WEBGL);
    if (extension) {
      const techniques = resolveTechniques(extension, gltfScenegraph);
      for (const material of json.materials || []) {
        const materialExtension = gltfScenegraph.getObjectExtension(material, KHR_TECHNIQUES_WEBGL);
        if (materialExtension) {
          material.technique = Object.assign({}, materialExtension, techniques[materialExtension.technique]);
          material.technique.values = resolveValues(material.technique, gltfScenegraph);
        }
        gltfScenegraph.removeObjectExtension(material, KHR_TECHNIQUES_WEBGL);
      }
      gltfScenegraph.removeExtension(KHR_TECHNIQUES_WEBGL);
    }
  }