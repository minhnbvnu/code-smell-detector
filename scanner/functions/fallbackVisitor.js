function fallbackVisitor(node) {
                switch (node.kind) {
                    case 167 /* Decorator */:
                        return void 0;
                    default:
                        return visitor(node);
                }
            }