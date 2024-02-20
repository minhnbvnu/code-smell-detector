async function getAllWallMeshes() {
 const wallsIDs = manager.getAllItemsOfType(0, IFCWALL, false);
 const meshes = [];
  const customID = 'temp-gltf-subset';

  for(const wallID of wallsIDs) {
   const coordinates = [];
   const expressIDs = [];
   const newIndices = [];

   const alreadySaved = new Map();

   const subset = viewer.IFC.loader.ifcManager.createSubset({
     ids: [wallID],
     modelID,
     removePrevious: true,
     customID
   });

   const positionAttr = subset.geometry.attributes.position;
   const expressIDAttr = subset.geometry.attributes.expressID;

   const newGroups = subset.geometry.groups.filter((group) => group.count !== 0);
   const newMaterials = [];
   const prevMaterials = subset.material;
   let newMaterialIndex = 0;
   newGroups.forEach((group) => {
     newMaterials.push(prevMaterials[group.materialIndex]);
     group.materialIndex = newMaterialIndex++;
   });

   let newIndex = 0;
   for (let i = 0; i < subset.geometry.index.count; i++) {
     const index = subset.geometry.index.array[i];

     if (!alreadySaved.has(index)) {
       coordinates.push(positionAttr.array[3 * index]);
       coordinates.push(positionAttr.array[3 * index + 1]);
       coordinates.push(positionAttr.array[3 * index + 2]);

       expressIDs.push(expressIDAttr.getX(index));
       alreadySaved.set(index, newIndex++);
     }

     const saved = alreadySaved.get(index);
     newIndices.push(saved);
   }

   const geometryToExport = new BufferGeometry();
   const newVerticesAttr = new BufferAttribute(Float32Array.from(coordinates), 3);
   const newExpressIDAttr = new BufferAttribute(Uint32Array.from(expressIDs), 1);

   geometryToExport.setAttribute('position', newVerticesAttr);
   geometryToExport.setAttribute('expressID', newExpressIDAttr);
   geometryToExport.setIndex(newIndices);
   geometryToExport.groups = newGroups;
   geometryToExport.computeVertexNormals();

   const mesh = new Mesh(geometryToExport, newMaterials);
   meshes.push(mesh);
 }

  viewer.IFC.loader.ifcManager.removeSubset(modelID, undefined, customID);
  return meshes;
}