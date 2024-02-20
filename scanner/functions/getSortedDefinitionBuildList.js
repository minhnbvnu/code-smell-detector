function getSortedDefinitionBuildList(page, pageTotal, definitionsToSkip) {
    page = page || 1;
    pageTotal = pageTotal || 1;
    definitionsToSkip = definitionsToSkip || [];

    // Bucket definitions by parent
    const parentBuckets = {};
    const dupeBuckets = [];
    const noParentList = [];
    for (let definitionId in config.definitionBuildSettings) {
        // If paged build, ensure this image should be included
        if (typeof config.definitionBuildSettings[definitionId] === 'object') {
            if (definitionsToSkip.indexOf(definitionId) < 0) {
                let parentId = config.definitionBuildSettings[definitionId].parent;
                if (parentId) {
                    // if multi-parent, merge the buckets
                    if (typeof parentId !== 'string') {
                        parentId = createMultiParentBucket(parentId, parentBuckets, dupeBuckets);
                    }
                    bucketDefinition(definitionId, parentId, parentBuckets);
                } else {
                    noParentList.push(definitionId);
                }
            } else {
                console.log(`(*) Skipping ${definitionId}.`)
            }
        }
    }
    // Remove duplicate buckets that are no longer needed
    dupeBuckets.forEach((currentBucketId) => {
        parentBuckets[currentBucketId] = undefined;
    });
    // Remove parents from no parent list - they are in their buckets already
    for (let parentId in parentBuckets) {
        if (parentId) {
            noParentList.splice(noParentList.indexOf(parentId), 1);
        }
    }


    // Configure and club dependent variants together.
    for (let id in parentBuckets) {
        const definitionBucket = parentBuckets[id];
        if (definitionBucket) {
            definitionBucket.reverse().forEach(definitionId => {
                let variants = config.definitionVariants[definitionId];
                let parentId = config.definitionBuildSettings[definitionId].parent;

                // eg. id: base-debian ; variant: stretch
                // base-debian is part of parentId, but the variant does not have an interdependent definition.
                if (!parentId && variants) {
                    variants.forEach(variant => {
                        const skipVariant = skipParentVariants.filter(item => item.id === definitionId && item.variant === variant);
                        if (skipVariant.length === 0) {
                            variantsList.push([getDefinitionObject(definitionId, variant)]);
                        }
                    });
                } else if (typeof parentId == 'string') {
                    // eg. id: ruby ; variant: 2.7-bullseye which needs to be build before id: jekyll ; variant: 2.7-bullseye 
                    let parentVariants = config.definitionVariants[parentId];
                    if (variants) {
                        variants.forEach(variant => {
                            const variantId = config.definitionBuildSettings[definitionId].idMismatch === "true" && variant.includes('-') ? variant.split('-')[1] : variant;
                            if (parentVariants.includes(variantId)) {
                                const parentItem = getDefinitionObject(parentId, variantId);
                                const childItem = getDefinitionObject(definitionId, variant);
                                addToVariantsList(parentItem, childItem);
                            } else {
                                variantsList.push([getDefinitionObject(definitionId, variant)]);
                            }
                        });
                    } else {
                        let tags = config.definitionBuildSettings[definitionId].tags;
                        if (tags) {
                            const item = [
                                getDefinitionObject(id, undefined),
                                getDefinitionObject(definitionId, undefined),
                            ]
                            variantsList.push(item);
                        }
                    }
                } else if (typeof parentId == 'object') {
                    // eg. cpp
                    for (const id in parentId) {
                        let parentObjId = parentId[id];
                        let parentVariants = config.definitionVariants[parentObjId];
                        let commonVariant = id;

                        if (commonVariant) {
                            const shouldAddSingleVariant = parentId[commonVariant];
                            if (parentVariants.includes(commonVariant)) {
                                const parentItem = getDefinitionObject(parentObjId, commonVariant);
                                const childItem = getDefinitionObject(definitionId, commonVariant);
                                addToVariantsList(parentItem, childItem);
                            } else if (shouldAddSingleVariant) {
                                variantsList.push([getDefinitionObject(definitionId, commonVariant)]);
                            }
                        }
                        else {
                            let tags = config.definitionBuildSettings[definitionId].tags;
                            if (tags) {
                                const item = [
                                    getDefinitionObject(id, undefined),
                                    getDefinitionObject(definitionId, undefined)
                                ]
                                variantsList.push(item);
                            }
                        }
                    }
                }
            });
        }
    }

    // As 'noParentList' does not have parents, add each variant to a separate object
    noParentList.forEach(definitionId => {
        let variants = config.definitionVariants[definitionId];
        if (variants) {
            variants.forEach(variant => {
                variantsList.push([getDefinitionObject(definitionId, variant)]);
            });
        } else {
            let tags = config.definitionBuildSettings[definitionId].tags;
            if (tags) {
                variantsList.push([getDefinitionObject(definitionId, undefined)]);
            }
        }
    });

    let allPages = variantsList;

    console.log(`(*) Builds pagination needs at least ${variantsList.length} pages to parallelize jobs efficiently.\n`);

    if (allPages.length > pageTotal) {
        // If too many pages, add extra pages to last one
        console.log(`(!) Not enough pages to for target page size. Adding excess definitions to last page.`);
        let i = pageTotal;
        while (i < allPages.length) {
            allPages[pageTotal - 1] = allPages[pageTotal - 1].concat(allPages[i]);
            allPages.splice(i, 1);
        }
    } else if (allPages.length < pageTotal) {
        // If too few, add some empty pages
        for (let i = allPages.length; i < pageTotal; i++) {
            allPages.push([]);
        }
    }

    console.log(`(*) Builds paginated as follows: ${JSON.stringify(allPages, null, 4)}\n(*) Processing page ${page} of ${pageTotal}.\n`);

    return allPages[page - 1];
}