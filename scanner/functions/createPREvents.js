async function createPREvents(options, request) {
    const {
        username,
        scmConfig,
        prRef,
        prNum,
        pipelines,
        prTitle,
        changedFiles,
        branch,
        action,
        prSource,
        restrictPR,
        chainPR,
        ref,
        releaseName
    } = options;
    const { scm } = request.server.app.pipelineFactory;
    const { eventFactory, pipelineFactory, userFactory } = request.server.app;
    const scmDisplayName = scm.getDisplayName({ scmContext: scmConfig.scmContext });
    const userDisplayName = `${scmDisplayName}:${username}`;
    let { sha } = options;

    scmConfig.prNum = prNum;

    const eventConfigs = await Promise.all(
        pipelines.map(async p => {
            try {
                const b = await p.branch;
                // obtain pipeline's latest commit sha for branch specific job
                let configPipelineSha = '';
                let subscribedConfigSha = '';
                let eventConfig = {};

                // Check if the webhook event is from a subscribed repo and
                // and fetch the source repo commit sha and save the subscribed sha
                if (uriTrimmer(scmConfig.scmUri) !== uriTrimmer(p.scmUri)) {
                    subscribedConfigSha = sha;

                    try {
                        sha = await pipelineFactory.scm.getCommitSha({
                            scmUri: p.scmUri,
                            scmContext: scmConfig.scmContext,
                            token: scmConfig.token
                        });
                    } catch (err) {
                        if (err.status >= 500) {
                            throw err;
                        } else {
                            logger.info(`skip create event for branch: ${b}`);
                        }
                    }

                    configPipelineSha = sha;
                } else {
                    try {
                        configPipelineSha = await pipelineFactory.scm.getCommitSha(scmConfig);
                    } catch (err) {
                        if (err.status >= 500) {
                            throw err;
                        } else {
                            logger.info(`skip create event for branch: ${b}`);
                        }
                    }
                }

                const { skipMessage, resolvedChainPR } = getSkipMessageAndChainPR({
                    // Workaround for pipelines which has NULL value in `pipeline.annotations`
                    pipeline: !p.annotations ? { annotations: {}, ...p } : p,
                    prSource,
                    restrictPR,
                    chainPR
                });

                const prInfo = await eventFactory.scm.getPrInfo(scmConfig);

                eventConfig = {
                    pipelineId: p.id,
                    type: 'pr',
                    webhooks: true,
                    username,
                    scmContext: scmConfig.scmContext,
                    sha,
                    configPipelineSha,
                    startFrom: `~pr:${branch}`,
                    changedFiles,
                    causeMessage: `${action} by ${userDisplayName}`,
                    chainPR: resolvedChainPR,
                    prRef,
                    prNum,
                    prTitle,
                    prInfo,
                    prSource,
                    baseBranch: branch
                };

                if (b === branch) {
                    eventConfig.startFrom = '~pr';
                }

                // Check if the webhook event is from a subscribed repo and
                // set the jobs entrypoint from ~startFrom
                // For subscribed PR event, it should be mimicked as a commit
                // in order to function properly
                if (uriTrimmer(scmConfig.scmUri) !== uriTrimmer(p.scmUri)) {
                    eventConfig = {
                        pipelineId: p.id,
                        type: 'pipeline',
                        webhooks: true,
                        username,
                        scmContext: scmConfig.scmContext,
                        startFrom: '~subscribe',
                        sha,
                        configPipelineSha,
                        changedFiles,
                        baseBranch: branch,
                        causeMessage: `Merged by ${username}`,
                        releaseName,
                        ref,
                        subscribedEvent: true,
                        subscribedConfigSha,
                        subscribedSourceUrl: prInfo.url
                    };

                    await updateAdmins(userFactory, username, scmConfig.scmContext, p.id, pipelineFactory);
                }

                if (skipMessage) {
                    eventConfig.skipMessage = skipMessage;
                }

                return eventConfig;
            } catch (err) {
                logger.warn(`pipeline:${p.id} error in starting event`, err);

                return null;
            }
        })
    );

    const events = await startEvents(eventConfigs, eventFactory);

    return events;
}