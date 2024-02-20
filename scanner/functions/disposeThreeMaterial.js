function disposeThreeMaterial(material) {
    const textures = findTextures(material);
    // Remove material
    if (Array.isArray(material)) {
        for (const m of material) {
            m.dispose();
        }
    } else {
        material.dispose();
    }
    // Remove textures
    for (let i = 0; i < textures.length; i++) {
        textures[i].dispose();
    }
}