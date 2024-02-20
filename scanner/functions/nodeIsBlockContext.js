function nodeIsBlockContext(node) {
            if (nodeIsTypeScriptDeclWithBlockContext(node)) {
                return true;
            }
            switch (node.kind) {
                case 238 /* Block */:
                case 266 /* CaseBlock */:
                case 207 /* ObjectLiteralExpression */:
                case 265 /* ModuleBlock */:
                    return true;
            }
            return false;
        }