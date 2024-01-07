function referencesToIndices(model) {
    const vertices = model.vertices;
    const skins = model.skins;
    const meshes = model.meshes;
    const meshInstances = model.meshInstances;

    for (let i = 0; i < meshes.length; i++) {
        meshes[i].vertices = vertices.indexOf(meshes[i].vertices);
        if (meshes[i].skin !== undefined) {
            meshes[i].skin = skins.indexOf(meshes[i].skin);
        }
    }
    for (let i = 0; i < meshInstances.length; i++) {
        meshInstances[i].mesh = meshes.indexOf(meshInstances[i].mesh);
    }
}