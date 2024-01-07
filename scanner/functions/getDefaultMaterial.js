function getDefaultMaterial(device) {
    const material = defaultMaterialDeviceCache.get(device);
    Debug.assert(material);
    return material;
}