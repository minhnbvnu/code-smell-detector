function allowLetAndConstDeclarations(parent2) {
                switch (parent2.kind) {
                    case 242 /* IfStatement */:
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                    case 251 /* WithStatement */:
                    case 245 /* ForStatement */:
                    case 246 /* ForInStatement */:
                    case 247 /* ForOfStatement */:
                        return false;
                    case 253 /* LabeledStatement */:
                        return allowLetAndConstDeclarations(parent2.parent);
                }
                return true;
            }