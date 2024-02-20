function listCalls(opts) {
    return normalize.pagination(
        client.calls.list,
        'calls',
        normalize.call,
        opts
    );
}