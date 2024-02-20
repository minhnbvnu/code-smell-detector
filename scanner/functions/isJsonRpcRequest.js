function isJsonRpcRequest(s) {
    try {
        s = JSON.parse(s);
        return s.jsonrpc === '2.0' && 'method' in s;
    } catch (e) { /* intentionally empty */ }
    return false;
}