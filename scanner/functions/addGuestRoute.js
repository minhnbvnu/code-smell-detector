function addGuestRoute(config) {
    return [
        {
            method: ['GET'],
            path: '/auth/login/guest/{web?}',
            options: {
                description: 'Login as an guest user',
                notes: 'Authenticate an guest user',
                tags: ['api', 'auth', 'login'],
                plugins: {
                    'hapi-rate-limit': {
                        enabled: false
                    }
                },
                auth: null,
                handler: async (request, h) => {
                    // Check if guest is allowed to login
                    if (!config.allowGuestAccess) {
                        return boom.forbidden('Guest users are not allowed access');
                    }

                    const username = `guest/${uuidv4()}`;
                    const profile = request.server.plugins.auth.generateProfile({
                        username,
                        scope: ['user', 'guest'],
                        metadata: {}
                    });

                    // Log that the user has authenticated
                    request.log(['auth'], `${username} has logged in`);

                    profile.token = request.server.plugins.auth.generateToken(profile, config.sessionTimeout);
                    request.cookieAuth.set(profile);

                    if (request.params.web === 'web') {
                        return h.response('<script>window.close();</script>');
                    }

                    return h.redirect('/v4/auth/token');
                }
            }
        }
    ];
}