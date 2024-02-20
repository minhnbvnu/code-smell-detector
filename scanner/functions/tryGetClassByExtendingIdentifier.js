function tryGetClassByExtendingIdentifier(node) {
                        return tryGetClassExtendingExpressionWithTypeArguments(climbPastPropertyAccess(node).parent);
                    }