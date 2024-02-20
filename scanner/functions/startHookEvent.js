async function startHookEvent(request, h, webhookConfig) {
    const { userFactory, pipelineFactory } = request.server.app;
    const { scm } = pipelineFactory;
    const ignoreUser = webhookConfig.pluginOptions.ignoreCommitsBy;
    let message = 'Unable to process this kind of event';
    let skipMessage;
    let parsedHookId = '';

    const { type, hookId, username, scmContext, ref, checkoutUrl, action, prNum } = webhookConfig;

    parsedHookId = hookId;

    try {
        // skipping checks
        if (/\[(skip ci|ci skip)\]/.test(webhookConfig.lastCommitMessage)) {
            skipMessage = 'Skipping due to the commit message: [skip ci]';
        }

        // if skip ci then don't return
        if (ignoreUser && ignoreUser.length !== 0 && !skipMessage) {
            const commitAuthors =
                Array.isArray(webhookConfig.commitAuthors) && webhookConfig.commitAuthors.length !== 0
                    ? webhookConfig.commitAuthors
                    : [username];
            const validCommitAuthors = commitAuthors.filter(author => !ignoreUser.includes(author));

            if (!validCommitAuthors.length) {
                message = `Skipping because user ${username} is ignored`;
                request.log(['webhook', hookId], message);

                return h.response({ message }).code(204);
            }
        }

        const token = await obtainScmToken({
            pluginOptions: webhookConfig.pluginOptions,
            userFactory,
            username,
            scmContext,
            scm
        });

        if (action !== 'release' && action !== 'tag') {
            let scmUri;

            if (type === 'pr') {
                scmUri = await scm.parseUrl({ checkoutUrl, token, scmContext });
            }
            webhookConfig.changedFiles = await scm.getChangedFiles({
                webhookConfig,
                type,
                token,
                scmContext,
                scmUri,
                prNum
            });
            request.log(['webhook', hookId], `Changed files are ${webhookConfig.changedFiles}`);
        } else {
            // The payload has no sha when webhook event is tag or release, so we need to get it.
            try {
                webhookConfig.sha = await getCommitRefSha({
                    scm,
                    token,
                    ref,
                    refType: 'tags',
                    checkoutUrl,
                    scmContext
                });
            } catch (err) {
                request.log(['webhook', hookId, 'getCommitRefSha'], err);

                // there is a possibility of scm.getCommitRefSha() is not implemented yet
                return h.response({ message }).code(204);
            }
        }

        if (type === 'pr') {
            // disregard skip ci for pull request events
            return pullRequestEvent(webhookConfig.pluginOptions, request, h, webhookConfig, token);
        }

        return pushEvent(request, h, webhookConfig, skipMessage, token);
    } catch (err) {
        logger.error(`[${parsedHookId}]: ${err}`);

        throw err;
    }
}