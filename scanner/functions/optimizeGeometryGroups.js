function optimizeGeometryGroups(object3D) {
    if (!object3D.geometry) {
        return;
    }

    object3D.geometry.groups.sort((a, b) => (a.start - b.start) * -1); // [5,10,7] => [10,7,5]
    const lastIndex = object3D.geometry.groups.length - 1;
    let currentMaterialIndex = object3D.geometry.groups[lastIndex].materialIndex; // initialized with the lastest group
    const usedIndexMaterials = [currentMaterialIndex]; // compute materials actually used by group
    // for loop descendant to be able to splice in loop without modifying group index
    for (let index = lastIndex - 1; index >= 0; index--) { // begin at lastIndex - 1 because intialized with lastIndex
        const group = object3D.geometry.groups[index];
        if (group.materialIndex !== currentMaterialIndex) {
            // this is another group (!= materialIndex) take its material as ref to continue
            currentMaterialIndex = group.materialIndex;
            usedIndexMaterials.push(currentMaterialIndex);
            continue;
        } else {
            // indeed same group merge with previous group
            const previousGroup = object3D.geometry.groups[index + 1];
            previousGroup.count += group.count; // previous group wrap the current one
            object3D.geometry.groups.splice(index, 1); // remove group
        }
    }

    // clean unused material
    for (let index = object3D.material.length - 1; index >= 0; index--) {
        if (!usedIndexMaterials.includes(index)) {
            // update all materialIndex in groups
            object3D.geometry.groups.forEach((group) => {
                if (group.materialIndex > index) {
                    // only materialIndex > at index are modified
                    group.materialIndex -= 1;
                }
            });

            // remove
            object3D.material.splice(index, 1);
        }
    }
}