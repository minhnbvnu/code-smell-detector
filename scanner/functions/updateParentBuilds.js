async function updateParentBuilds({ joinParentBuilds, nextBuild, build }) {
    // Override old parentBuilds info
    const newParentBuilds = merge({}, joinParentBuilds, nextBuild.parentBuilds, (objVal, srcVal) =>
        // passthrough objects, else mergeWith mutates source
        srcVal && typeof srcVal === 'object' ? undefined : objVal || srcVal
    );

    nextBuild.parentBuilds = newParentBuilds;
    // nextBuild.parentBuildId may be int or Array, so it needs to be flattened
    nextBuild.parentBuildId = Array.from(new Set([build.id, nextBuild.parentBuildId || []].flat()));

    // FIXME: Is this needed ? Why not update once in handleNewBuild()
    return nextBuild.update();
}