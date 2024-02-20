function bucketDefinition(definitionId, parentId, parentBuckets) {
    // Handle parents that have parents
    // TODO: Recursive parents rather than just parents-of-parents
    if (config.definitionBuildSettings[parentId].parent) {
        const oldParentId = parentId;
        parentId = config.definitionBuildSettings[parentId].parent;
        parentBuckets[parentId] = parentBuckets[parentId] || [parentId];
        if (parentBuckets[parentId].indexOf(oldParentId) < 0) {
            parentBuckets[parentId].push(oldParentId);
        }
    }

    // Add to parent bucket
    parentBuckets[parentId] = parentBuckets[parentId] || [parentId];
    if (parentBuckets[parentId].indexOf(definitionId) < 0) {
        parentBuckets[parentId].push(definitionId);
    }
}