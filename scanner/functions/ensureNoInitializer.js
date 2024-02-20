function ensureNoInitializer(node) {
                if (shouldPrintWithInitializer(node)) {
                    return resolver.createLiteralConstValue(getParseTreeNode(node), symbolTracker);
                }
                return void 0;
            }