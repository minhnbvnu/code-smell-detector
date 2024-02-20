function setStatusError(node, allNodes, message = undefined) {
        if(allNodes) {
            for (var id in node.users) {
                if (hasProperty(node.users, id)) {
                    node.users[id].status({ fill: "red", shape: "dot", text: message ?? "error" });
                }
            }
        } else {
            node.status({ fill: "red", shape: "dot", text: message ?? "error" });
        }
    }