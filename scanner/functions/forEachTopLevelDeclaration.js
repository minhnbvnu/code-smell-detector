function forEachTopLevelDeclaration(statement, cb) {
            switch (statement.kind) {
                case 259 /* FunctionDeclaration */:
                case 260 /* ClassDeclaration */:
                case 264 /* ModuleDeclaration */:
                case 263 /* EnumDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                    return cb(statement);
                case 240 /* VariableStatement */:
                    return firstDefined(statement.declarationList.declarations, (decl) => forEachTopLevelDeclarationInBindingName(decl.name, cb));
                case 241 /* ExpressionStatement */: {
                    const { expression } = statement;
                    return isBinaryExpression(expression) && getAssignmentDeclarationKind(expression) === 1 /* ExportsProperty */ ? cb(statement) : void 0;
                }
            }
        }