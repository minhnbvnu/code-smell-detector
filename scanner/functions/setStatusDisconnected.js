function setStatusDisconnected(node, allNodes) {
        if (allNodes) {
            for (let id in node.users) {
                if (hasProperty(node.users, id)) {
                    node.users[id].status({ fill: "red", shape: "ring", text: "node-red:common.status.disconnected"});
                }
            }
        } else {
            node.status({ fill: "red", shape: "ring", text: "node-red:common.status.disconnected" })
        }
    }