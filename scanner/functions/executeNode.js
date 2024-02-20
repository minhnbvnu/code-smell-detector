function executeNode(node, segmentNumber) {
            if (node.children) {
                return {
                    fn(done) {
                        nodeStart(node);

                        queueRunnerFactory({
                            onComplete() {
                                nodeComplete(node, node.getResult());
                                done();
                            },
                            queueableFns: wrapChildren(node, segmentNumber),
                            userContext: node.sharedUserContext(),
                            onException() {
                                node.onException.apply(node, arguments);
                            }
                        });
                    }
                };
            }
            return {
                fn(done) { node.execute(done, stats[node.id].executable); }
            };
        }