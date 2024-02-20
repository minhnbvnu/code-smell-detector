function disposeSingleMaterialAndTextures(material) {
    material.dispose();
    // dispose textures
    for (const key of Object.keys(material)) {
        const val = material[key];
        if (val && val.isTexture) {
            val.dispose();
        }
    }
}