function startCall(to, action) {
    return Q.nfcall(client.makeCall, {
        to: to,
        from: _.first(config.phones),
        url: action
    });
}