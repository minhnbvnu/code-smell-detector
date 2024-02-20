function createLabeledStatement(label, statement) {
                const node = createBaseNode(253 /* LabeledStatement */);
                node.label = asName(label);
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.label) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }