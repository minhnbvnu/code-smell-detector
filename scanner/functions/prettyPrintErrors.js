function prettyPrintErrors(request, h) {
    const { response } = request;
    const { release } = request.server.app;

    if (release && release.cookieName && request.state && !request.state[release.cookieName]) {
        h.state(release.cookieName, release.cookieValue);
    }

    if (!response.isBoom) {
        return h.continue;
    }

    const err = response;
    const errName = err.output.payload.error;
    const errMessage = err.message;
    const { statusCode } = err.output.payload;
    const stack = err.stack || errMessage;

    if (statusCode === 500) {
        request.log(['server', 'error'], stack);
    }

    const res = {
        statusCode,
        error: errName,
        message: errMessage
    };

    if (err.data) {
        res.data = err.data;
    }

    return h.response(res).code(statusCode);
}