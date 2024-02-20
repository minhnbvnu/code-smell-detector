function createClassStaticBlockDeclaration(body) {
                const node = createBaseDeclaration(172 /* ClassStaticBlockDeclaration */);
                node.body = body;
                node.transformFlags = propagateChildFlags(body) | 16777216 /* ContainsClassFields */;
                node.modifiers = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }