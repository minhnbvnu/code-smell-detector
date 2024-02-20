async function obtainScmToken({ pluginOptions, userFactory, username, scmContext, scm }) {
    const { readOnlyEnabled, headlessAccessToken } = getReadOnlyInfo({ scm, scmContext });

    // If pipeline is in read-only SCM, use read-only token
    if (readOnlyEnabled && headlessAccessToken) {
        return headlessAccessToken;
    }

    const user = await userFactory.get({ username, scmContext });

    // Use generic username and token
    if (!user) {
        const genericUsername = pluginOptions.username;
        const buildBotUser = await userFactory.get({ username: genericUsername, scmContext });

        return buildBotUser.unsealToken();
    }

    return user.unsealToken();
}