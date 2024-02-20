function onUpdated(beacon) {
            node.send({topic: node.topic || 'updated', payload: beacon});
        }