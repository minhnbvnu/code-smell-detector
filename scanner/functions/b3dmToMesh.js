function b3dmToMesh(data, layer, url) {
    const urlBase = THREE.LoaderUtils.extractUrlBase(url);
    const options = {
        gltfUpAxis: layer.tileset.asset.gltfUpAxis,
        urlBase,
        overrideMaterials: layer.overrideMaterials,
        doNotPatchMaterial: layer.doNotPatchMaterial,
        opacity: layer.opacity,
        registeredExtensions: layer.registeredExtensions,
        layer,
    };
    return B3dmParser.parse(data, options).then((result) => {
        const batchTable = result.batchTable;
        // object3d is actually a THREE.Scene
        const object3d = result.gltf.scene;
        return { batchTable, object3d };
    });
}