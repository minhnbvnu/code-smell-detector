function cleanupToken(config) {
    const tokenName = config.token;
    const { instance } = config;
    const { namespace } = config;
    const { jwt } = config;

    return request({
        url: `${instance}/${namespace}/tokens`,
        method: 'GET',
        context: {
            token: jwt
        }
    }).then(response => {
        const match = response.body.find(token => token.name === tokenName);

        if (!match) return Promise.resolve();

        return request({
            url: `${instance}/${namespace}/tokens/${match.id}`,
            method: 'DELETE',
            context: {
                token: jwt
            }
        });
    });
}