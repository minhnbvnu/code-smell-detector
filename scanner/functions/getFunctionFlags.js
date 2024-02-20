function getFunctionFlags(node) {
            if (!node) {
                return 4 /* Invalid */;
            }
            let flags = 0 /* Normal */;
            switch (node.kind) {
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 171 /* MethodDeclaration */:
                    if (node.asteriskToken) {
                        flags |= 1 /* Generator */;
                    }
                case 216 /* ArrowFunction */:
                    if (hasSyntacticModifier(node, 512 /* Async */)) {
                        flags |= 2 /* Async */;
                    }
                    break;
            }
            if (!node.body) {
                flags |= 4 /* Invalid */;
            }
            return flags;
        }