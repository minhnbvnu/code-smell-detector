function isJsonRpcResponse(s) {
    try {
        s = JSON.parse(s);
        return s.jsonrpc === '2.0' &&
            ('result' in s || 'error' in s);
    } catch (e) { /* intentionally empty */ }
    return false;
}