function sc_withHandlerLambda(handler, body) {
    try {
	return body();
    } catch(e) {
	if (!e._internalException)
	    return handler(e);
	else
	    throw e;
    }
}