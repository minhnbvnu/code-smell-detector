function createForStatement(initializer, condition, incrementor, statement) {
                const node = createBaseNode(245 /* ForStatement */);
                node.initializer = initializer;
                node.condition = condition;
                node.incrementor = incrementor;
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.initializer) | propagateChildFlags(node.condition) | propagateChildFlags(node.incrementor) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                return node;
            }