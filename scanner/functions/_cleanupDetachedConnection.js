function _cleanupDetachedConnection(conn) {
            delete conn.proxies;
            var group = _connectionSourceMap[conn.id], f;
            if (group != null) {
                f = function(c) { return c.id === conn.id; };
                _ju.removeWithFunction(group.connections.source, f);
                _ju.removeWithFunction(group.connections.target, f);
                delete _connectionSourceMap[conn.id];
            }

            group = _connectionTargetMap[conn.id];
            if (group != null) {
                f = function(c) { return c.id === conn.id; };
                _ju.removeWithFunction(group.connections.source, f);
                _ju.removeWithFunction(group.connections.target, f);
                delete _connectionTargetMap[conn.id];
            }
        }