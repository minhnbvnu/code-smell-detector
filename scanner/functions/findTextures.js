function findTextures(material) {
    const textures = [];
    if (material.alphaMap) {
        textures.push(material.map);
    }
    if (material.aoMap) {
        textures.push(material.map);
    }
    if (material.bumpMap) {
        textures.push(material.bumpMap);
    }
    if (material.displacementMap) {
        textures.push(material.bumpMap);
    }
    if (material.emissiveMap) {
        textures.push(material.emissiveMap);
    }
    if (material.envMap) {
        textures.push(material.envMap);
    }
    if (material.lightMap) {
        textures.push(material.envMap);
    }
    if (material.map) {
        textures.push(material.map);
    }
    if (material.metalnessMap) {
        textures.push(material.map);
    }
    if (material.normalMap) {
        textures.push(material.map);
    }
    if (material.roughnessMap) {
        textures.push(material.map);
    }
    if (material.specularMap) {
        textures.push(material.specularMap);
    }
    return textures;
}