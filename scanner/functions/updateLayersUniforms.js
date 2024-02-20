function updateLayersUniforms(uniforms, olayers, max) {
    // prepare convenient access to elevation or color uniforms
    const layers = uniforms.layers.value;
    const textures = uniforms.textures.value;
    const offsetScales = uniforms.offsetScales.value;
    const textureCount = uniforms.textureCount;

    // flatten the 2d array [i,j] -> layers[_layerIds[i]].textures[j]
    let count = 0;
    for (const layer of olayers) {
        // textureOffset property is added to RasterTile
        layer.textureOffset = count;
        for (let i = 0, il = layer.textures.length; i < il; ++i, ++count) {
            if (count < max) {
                offsetScales[count] = layer.offsetScales[i];
                textures[count] = layer.textures[i];
                layers[count] = layer;
            }
        }
    }
    if (count > max) {
        console.warn(`LayeredMaterial: Not enough texture units (${max} < ${count}), excess textures have been discarded.`);
    }
    textureCount.value = count;

    // WebGL 2.0 doesn't support the undefined uniforms.
    // So the undefined uniforms are defined by default value.
    for (let i = count; i < textures.length; i++) {
        textures[i] = defaultTex;
        offsetScales[i] = identityOffsetScale;
        layers[i] = defaultStructLayer;
    }
}