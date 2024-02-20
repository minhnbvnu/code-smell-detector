function emitBindingOrAssignment(target, value, location, original) {
                Debug.assertNode(target, isBindingName);
                if (pendingExpressions) {
                    value = context.factory.inlineExpressions(append(pendingExpressions, value));
                    pendingExpressions = void 0;
                }
                pendingDeclarations.push({ pendingExpressions, name: target, value, location, original });
            }