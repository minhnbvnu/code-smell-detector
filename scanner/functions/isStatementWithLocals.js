function isStatementWithLocals(node) {
            switch (node.kind) {
                case 238 /* Block */:
                case 266 /* CaseBlock */:
                case 245 /* ForStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                    return true;
            }
            return false;
        }