function setDefaultMaterial(device, material) {
    Debug.assert(material);
    defaultMaterialDeviceCache.get(device, () => {
        return material;
    });
}