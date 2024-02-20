function getCall(id) {
    return Q.nfcall(client.calls(id).get)
    .then(normalize.call);
}