function emitNodeWithNotification(hint, node, emitCallback) {
                Debug.assert(state < 3 /* Disposed */, "Cannot invoke TransformationResult callbacks after the result is disposed.");
                if (node) {
                    if (isEmitNotificationEnabled(node)) {
                        onEmitNode(hint, node, emitCallback);
                    }
                    else {
                        emitCallback(hint, node);
                    }
                }
            }