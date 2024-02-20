function containsTopLevelCommonjs(sourceFile) {
            return sourceFile.statements.some((statement) => {
                switch (statement.kind) {
                    case 240 /* VariableStatement */:
                        return statement.declarationList.declarations.some((decl) => !!decl.initializer && isRequireCall(propertyAccessLeftHandSide(decl.initializer), 
                        /*checkArgumentIsStringLiteralLike*/
                        true));
                    case 241 /* ExpressionStatement */: {
                        const { expression } = statement;
                        if (!isBinaryExpression(expression))
                            return isRequireCall(expression, 
                            /*checkArgumentIsStringLiteralLike*/
                            true);
                        const kind = getAssignmentDeclarationKind(expression);
                        return kind === 1 /* ExportsProperty */ || kind === 2 /* ModuleExports */;
                    }
                    default:
                        return false;
                }
            });
        }