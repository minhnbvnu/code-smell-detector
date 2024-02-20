function resetCurrentNamespaceExpression(node) {
                if (node === currentFailedNamespaceExpression) {
                    currentFailedNamespaceExpression = null;
                }
            }