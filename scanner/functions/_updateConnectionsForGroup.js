function _updateConnectionsForGroup(group) {
            var members = group.getMembers();
            var c1 = _jsPlumb.getConnections({source:members, scope:"*"}, true);
            var c2 = _jsPlumb.getConnections({target:members, scope:"*"}, true);
            var processed = {};
            group.connections.source.length = 0;
            group.connections.target.length = 0;
            var oneSet = function(c) {
                for (var i = 0; i < c.length; i++) {
                    if (processed[c[i].id]) {
                        continue;
                    }
                    processed[c[i].id] = true;
                    if (c[i].source._jsPlumbGroup === group) {
                        if (c[i].target._jsPlumbGroup !== group) {
                            group.connections.source.push(c[i]);
                        }
                        _connectionSourceMap[c[i].id] = group;
                    }
                    else if (c[i].target._jsPlumbGroup === group) {
                        group.connections.target.push(c[i]);
                        _connectionTargetMap[c[i].id] = group;
                    }
                }
            };
            oneSet(c1); oneSet(c2);
        }