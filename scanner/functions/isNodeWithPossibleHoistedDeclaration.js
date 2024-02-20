function isNodeWithPossibleHoistedDeclaration(node) {
            switch (node.kind) {
                case 238 /* Block */:
                case 240 /* VariableStatement */:
                case 251 /* WithStatement */:
                case 242 /* IfStatement */:
                case 252 /* SwitchStatement */:
                case 266 /* CaseBlock */:
                case 292 /* CaseClause */:
                case 293 /* DefaultClause */:
                case 253 /* LabeledStatement */:
                case 245 /* ForStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                case 243 /* DoStatement */:
                case 244 /* WhileStatement */:
                case 255 /* TryStatement */:
                case 295 /* CatchClause */:
                    return true;
            }
            return false;
        }