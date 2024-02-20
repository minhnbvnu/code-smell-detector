function liftToBlock(nodes) {
                Debug.assert(every(nodes, isStatementOrBlock), "Cannot lift nodes to a Block.");
                return singleOrUndefined(nodes) || createBlock(nodes);
            }