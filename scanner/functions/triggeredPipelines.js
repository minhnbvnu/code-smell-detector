async function triggeredPipelines(
    pipelineFactory,
    scmConfig,
    branch,
    type,
    action,
    changedFiles,
    releaseName,
    tagName
) {
    const { scmUri } = scmConfig;
    const splitUri = scmUri.split(':');
    const scmBranch = `${splitUri[0]}:${splitUri[1]}:${splitUri[2]}`;
    const scmRepoId = `${splitUri[0]}:${splitUri[1]}`;
    const listConfig = {
        search: { field: 'scmUri', keyword: `${scmRepoId}:%` },
        params: {
            state: 'ACTIVE'
        }
    };
    const externalRepoSearchConfig = {
        search: { field: 'subscribedScmUrlsWithActions', keyword: `%${scmRepoId}:%` },
        params: {
            state: 'ACTIVE'
        }
    };

    const pipelines = await pipelineFactory.list(listConfig);

    const pipelinesWithSubscribedRepos = await pipelineFactory.list(externalRepoSearchConfig);

    let pipelinesOnCommitBranch = [];
    let pipelinesOnOtherBranch = [];

    pipelines.forEach(p => {
        // This uri expects 'scmUriDomain:repoId:branchName:rootDir'. To Compare, rootDir is ignored.
        const splitScmUri = p.scmUri.split(':');
        const pipelineScmBranch = `${splitScmUri[0]}:${splitScmUri[1]}:${splitScmUri[2]}`;

        if (pipelineScmBranch === scmBranch) {
            pipelinesOnCommitBranch.push(p);
        } else {
            pipelinesOnOtherBranch.push(p);
        }
    });

    // Build runs regardless of changedFiles when release/tag trigger
    pipelinesOnCommitBranch = pipelinesOnCommitBranch.filter(
        p => ['release', 'tag'].includes(action) || hasChangesUnderRootDir(p, changedFiles)
    );

    pipelinesOnOtherBranch = pipelinesOnOtherBranch.filter(p => {
        let isReleaseOrTagFiltering = '';

        if (action === 'release' || action === 'tag') {
            isReleaseOrTagFiltering = isReleaseOrTagFilteringEnabled(action, p.workflowGraph);
        }

        return hasTriggeredJob(
            p,
            determineStartFrom(action, type, branch, null, releaseName, tagName, isReleaseOrTagFiltering)
        );
    });

    const currentRepoPipelines = pipelinesOnCommitBranch.concat(pipelinesOnOtherBranch);

    return currentRepoPipelines.concat(pipelinesWithSubscribedRepos);
}