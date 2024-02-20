function updateStatus(node, allNodes) {
        let setStatus = setStatusDisconnected;

        if (node.connecting) {
            setStatus = setStatusConnecting;
        } else if (node.connected) {
            setStatus = setStatusConnected;
        }

        setStatus(node, allNodes);
    }