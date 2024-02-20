function getContextualTypeForObjectLiteralMethod(node, contextFlags) {
                Debug.assert(isObjectLiteralMethod(node));
                if (node.flags & 33554432 /* InWithStatement */) {
                    return void 0;
                }
                return getContextualTypeForObjectLiteralElement(node, contextFlags);
            }