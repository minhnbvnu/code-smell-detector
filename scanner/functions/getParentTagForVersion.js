function getParentTagForVersion(definitionId, version, registry, registryPath, variant) {
    let parentId = config.definitionBuildSettings[definitionId].parent;
    if (parentId) {
        if(typeof parentId !== 'string') {
            // Use variant to figure out correct parent, or return first parent if child has no variant
            parentId = variant ? parentId[variant] : parentId[Object.keys(parentId)[0]];
        }
    
        // Determine right parent variant to use (assuming there are variants)
        const parentVariantList = getVariants(parentId);
        let parentVariantId;
        if(parentVariantList) {
            // If a variant is specified in the parentVariant property in build, use it - otherwise default to the child image's variant
            let parentVariant = config.definitionBuildSettings[definitionId].parentVariant || variant;
            if(typeof parentVariant !== 'string') {
                // Use variant to figure out correct variant it not the same across all parents, or return first variant if child has no variant
                parentVariant = variant ? parentVariant[variant] : parentVariant[Object.keys(parentId)[0]];
            }
            parentVariantId = config.definitionBuildSettings[definitionId].idMismatch === "true" && variant.includes('-') ? variant.split('-')[1] : variant;
            if(!parentVariantList.includes(parentVariantId)) {
                throw `Unable to determine variant for parent. Variant ${parentVariantId} is not in ${parentId} list: ${parentVariantList}`;
            }
        }
        
        // Parent image version may be different than child's
        const parentVersion = getVersionFromRelease(version, parentId);
        return getTagsForVersion(parentId, parentVersion, registry, registryPath, parentVariantId)[0];
    }
    return null;
}