function isListElement(parent2, node) {
            switch (parent2.kind) {
                case 260 /* ClassDeclaration */:
                case 261 /* InterfaceDeclaration */:
                    return rangeContainsRange(parent2.members, node);
                case 264 /* ModuleDeclaration */:
                    const body = parent2.body;
                    return !!body && body.kind === 265 /* ModuleBlock */ && rangeContainsRange(body.statements, node);
                case 308 /* SourceFile */:
                case 238 /* Block */:
                case 265 /* ModuleBlock */:
                    return rangeContainsRange(parent2.statements, node);
                case 295 /* CatchClause */:
                    return rangeContainsRange(parent2.block.statements, node);
            }
            return false;
        }