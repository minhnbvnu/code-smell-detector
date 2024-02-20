async function createEvents(
    eventFactory,
    userFactory,
    pipelineFactory,
    pipelines,
    parsed,
    skipMessage,
    scmConfigFromHook
) {
    const { action, branch, sha, username, scmContext, changedFiles, type, releaseName, ref } = parsed;

    const pipelineTuples = await Promise.all(
        pipelines.map(async p => {
            const resolvedBranch = await p.branch;
            let isReleaseOrTagFiltering = '';

            if (action === 'release' || action === 'tag') {
                isReleaseOrTagFiltering = isReleaseOrTagFilteringEnabled(action, p.workflowGraph);
            }
            const startFrom = determineStartFrom(
                action,
                type,
                branch,
                resolvedBranch,
                releaseName,
                ref,
                isReleaseOrTagFiltering
            );
            const tuple = { branch: resolvedBranch, pipeline: p, startFrom };

            return tuple;
        })
    );

    const ignoreExtraTriggeredPipelines = pipelineTuples.filter(t => {
        // empty event is not created when it is triggered by extra triggers (e.g. ~tag, ~release)
        if (EXTRA_TRIGGERS.test(t.startFrom) && !hasTriggeredJob(t.pipeline, t.startFrom)) {
            logger.warn(`Event not created: there are no jobs triggered by ${t.startFrom}`);

            return false;
        }

        return true;
    });

    const eventConfigs = await Promise.all(
        ignoreExtraTriggeredPipelines.map(async pTuple => {
            try {
                const pipelineBranch = pTuple.branch;
                let isReleaseOrTagFiltering = '';

                if (action === 'release' || action === 'tag') {
                    isReleaseOrTagFiltering = isReleaseOrTagFilteringEnabled(action, pTuple.pipeline.workflowGraph);
                }
                const startFrom = determineStartFrom(
                    action,
                    type,
                    branch,
                    pipelineBranch,
                    releaseName,
                    ref,
                    isReleaseOrTagFiltering
                );
                const token = await pTuple.pipeline.token;
                const scmConfig = {
                    scmUri: pTuple.pipeline.scmUri,
                    token,
                    scmContext
                };
                // obtain pipeline's latest commit sha for branch specific job
                let configPipelineSha = '';

                try {
                    configPipelineSha = await pipelineFactory.scm.getCommitSha(scmConfig);
                } catch (err) {
                    if (err.status >= 500) {
                        throw err;
                    } else {
                        logger.info(`skip create event for branch: ${pipelineBranch}`);
                    }
                }
                const eventConfig = {
                    pipelineId: pTuple.pipeline.id,
                    type: 'pipeline',
                    webhooks: true,
                    username,
                    scmContext,
                    startFrom,
                    sha,
                    configPipelineSha,
                    changedFiles,
                    baseBranch: branch,
                    causeMessage: `Merged by ${username}`,
                    meta: createMeta(parsed),
                    releaseName,
                    ref
                };

                // Check is the webhook event is from a subscribed repo and
                // set the jobs entry point to ~subscribe
                if (uriTrimmer(scmConfigFromHook.scmUri) !== uriTrimmer(pTuple.pipeline.scmUri)) {
                    eventConfig.subscribedEvent = true;
                    eventConfig.startFrom = '~subscribe';
                    eventConfig.subscribedConfigSha = eventConfig.sha;

                    try {
                        eventConfig.sha = await pipelineFactory.scm.getCommitSha(scmConfig);
                    } catch (err) {
                        if (err.status >= 500) {
                            throw err;
                        } else {
                            logger.info(`skip create event for this subscribed trigger`);
                        }
                    }

                    try {
                        const commitInfo = await pipelineFactory.scm.decorateCommit({
                            scmUri: scmConfigFromHook.scmUri,
                            scmContext,
                            sha: eventConfig.subscribedConfigSha,
                            token
                        });

                        eventConfig.subscribedSourceUrl = commitInfo.url;
                    } catch (err) {
                        if (err.status >= 500) {
                            throw err;
                        } else {
                            logger.info(`skip create event for this subscribed trigger`);
                        }
                    }
                }

                if (skipMessage) {
                    eventConfig.skipMessage = skipMessage;
                }

                await updateAdmins(userFactory, username, scmContext, pTuple.pipeline, pipelineFactory);

                return eventConfig;
            } catch (err) {
                logger.warn(`pipeline:${pTuple.pipeline.id} error in starting event`, err);

                return null;
            }
        })
    );

    const events = await startEvents(eventConfigs, eventFactory);

    return events;
}