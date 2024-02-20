function pullRequestEvent(pluginOptions, request, h, parsed, token) {
    const { pipelineFactory, userFactory } = request.server.app;
    const {
        hookId,
        action,
        checkoutUrl,
        branch,
        sha,
        prNum,
        prTitle,
        prRef,
        prSource,
        username,
        scmContext,
        changedFiles,
        type,
        releaseName,
        ref
    } = parsed;
    const fullCheckoutUrl = `${checkoutUrl}#${branch}`;
    const scmConfig = {
        scmUri: '',
        token,
        scmContext
    };
    const { restrictPR, chainPR } = pluginOptions;

    request.log(['webhook', hookId], `PR #${prNum} ${action} for ${fullCheckoutUrl}`);

    return pipelineFactory.scm
        .parseUrl({
            checkoutUrl: fullCheckoutUrl,
            token,
            scmContext
        })
        .then(scmUri => {
            scmConfig.scmUri = scmUri;

            return triggeredPipelines(pipelineFactory, scmConfig, branch, type, action, changedFiles, releaseName, ref);
        })
        .then(async pipelines => {
            if (!pipelines || pipelines.length === 0) {
                const message = `Skipping since Pipeline triggered by PRs against ${fullCheckoutUrl} does not exist`;

                request.log(['webhook', hookId], message);

                return h.response({ message }).code(204);
            }

            const options = {
                name: `PR-${prNum}`,
                hookId,
                sha,
                username,
                scmConfig,
                prRef,
                prNum,
                prTitle,
                prSource,
                changedFiles,
                action: action.charAt(0).toUpperCase() + action.slice(1),
                branch,
                fullCheckoutUrl,
                restrictPR,
                chainPR,
                pipelines,
                ref,
                releaseName
            };

            await batchUpdateAdmins({ userFactory, pipelines, username, scmContext, pipelineFactory });

            switch (action) {
                case 'opened':
                case 'reopened':
                    return pullRequestOpened(options, request, h);
                case 'synchronized':
                    return pullRequestSync(options, request, h);
                case 'closed':
                default:
                    return pullRequestClosed(options, request, h);
            }
        })
        .catch(err => {
            logger.error(`[${hookId}]: ${err}`);

            throw err;
        });
}