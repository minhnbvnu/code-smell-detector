function discardedValueVisitor(node) {
                return visitorWorker(node, 
                /*valueIsDiscarded*/
                true);
            }