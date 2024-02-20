function getReadOnlyInfo({ pipeline, scm, scmContext }) {
    const context = scmContext || pipeline.scmContext;
    const { enabled, username, accessToken } = scm.getReadOnlyInfo({ scmContext: context });

    return {
        readOnlyEnabled: enabled,
        pipelineContext: context,
        headlessUsername: username,
        headlessAccessToken: accessToken
    };
}