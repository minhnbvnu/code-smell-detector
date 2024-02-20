function onLost(beacon) {
            node.send({topic: node.topic || 'lost', payload: beacon});
        }