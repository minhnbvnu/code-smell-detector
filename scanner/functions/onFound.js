function onFound(beacon) {
            node.send({topic: node.topic || 'found', payload: beacon});
        }