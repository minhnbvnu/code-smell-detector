function _get_session(websocket_url, token, args_string) {
        const session_id = (0, connection_1.parse_token)(token).session_id;
        if (!_sessions.has(websocket_url))
            _sessions.set(websocket_url, new Map());
        const subsessions = _sessions.get(websocket_url);
        if (!subsessions.has(session_id))
            subsessions.set(session_id, (0, connection_1.pull_session)(websocket_url, token, args_string));
        return subsessions.get(session_id);
    }