function getIndexNodeForAccessExpression(accessNode) {
                return accessNode.kind === 209 /* ElementAccessExpression */ ? accessNode.argumentExpression : accessNode.kind === 196 /* IndexedAccessType */ ? accessNode.indexType : accessNode.kind === 164 /* ComputedPropertyName */ ? accessNode.expression : accessNode;
            }