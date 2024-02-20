function createMultiParentBucket(variantParentMap, parentBuckets, dupeBuckets) {
    // Get parent of first variant
    const parentId = variantParentMap[Object.keys(variantParentMap)[0]];
    const firstParentBucket =  parentBuckets[parentId] || [parentId];
    // Merge other parent buckets into the first parent
    for (let currentVariant in variantParentMap) {
        const currentParentId = variantParentMap[currentVariant];
        if (currentParentId !== parentId) {
            const currentParentBucket = parentBuckets[currentParentId];
            // Merge buckets if not already merged
            if (currentParentBucket && dupeBuckets.indexOf(currentParentId) < 0) {
                currentParentBucket.forEach((current) => firstParentBucket.push(current));
            } else if (firstParentBucket.indexOf(currentParentId)<0) {
                firstParentBucket.push(currentParentId);
            }
            dupeBuckets.push(currentParentId);
            parentBuckets[currentParentId]=firstParentBucket;
        }
    }
    parentBuckets[parentId] = firstParentBucket;
    return parentId;
}