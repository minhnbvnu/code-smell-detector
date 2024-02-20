function getSkipMessageAndChainPR({ pipeline, prSource, restrictPR, chainPR }) {
    const defaultRestrictPR = restrictPR || 'none';
    const result = {
        resolvedChainPR: resolveChainPR(chainPR, pipeline)
    };
    let restriction;

    if (['all-admin', 'none-admin', 'branch-admin', 'fork-admin'].includes(defaultRestrictPR)) {
        restriction = defaultRestrictPR;
    } else {
        restriction = pipeline.annotations[ANNOT_RESTRICT_PR] || defaultRestrictPR;
    }

    // Check for restriction upfront
    if (isRestrictedPR(restriction, prSource)) {
        result.skipMessage = `Skipping build since pipeline is configured to restrict ${restriction} and PR is ${prSource}`;
    }

    return result;
}