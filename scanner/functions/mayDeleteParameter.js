function mayDeleteParameter(checker, sourceFile, parameter, sourceFiles, program, cancellationToken, isFixAll) {
            const { parent: parent2 } = parameter;
            switch (parent2.kind) {
                case 171 /* MethodDeclaration */:
                case 173 /* Constructor */:
                    const index = parent2.parameters.indexOf(parameter);
                    const referent = isMethodDeclaration(parent2) ? parent2.name : parent2;
                    const entries = ts_FindAllReferences_exports.Core.getReferencedSymbolsForNode(parent2.pos, referent, program, sourceFiles, cancellationToken);
                    if (entries) {
                        for (const entry of entries) {
                            for (const reference of entry.references) {
                                if (reference.kind === ts_FindAllReferences_exports.EntryKind.Node) {
                                    const isSuperCall2 = isSuperKeyword(reference.node) && isCallExpression(reference.node.parent) && reference.node.parent.arguments.length > index;
                                    const isSuperMethodCall = isPropertyAccessExpression(reference.node.parent) && isSuperKeyword(reference.node.parent.expression) && isCallExpression(reference.node.parent.parent) && reference.node.parent.parent.arguments.length > index;
                                    const isOverriddenMethod = (isMethodDeclaration(reference.node.parent) || isMethodSignature(reference.node.parent)) && reference.node.parent !== parameter.parent && reference.node.parent.parameters.length > index;
                                    if (isSuperCall2 || isSuperMethodCall || isOverriddenMethod)
                                        return false;
                                }
                            }
                        }
                    }
                    return true;
                case 259 /* FunctionDeclaration */: {
                    if (parent2.name && isCallbackLike(checker, sourceFile, parent2.name)) {
                        return isLastParameter(parent2, parameter, isFixAll);
                    }
                    return true;
                }
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    return isLastParameter(parent2, parameter, isFixAll);
                case 175 /* SetAccessor */:
                    return false;
                case 174 /* GetAccessor */:
                    return true;
                default:
                    return Debug.failBadSyntaxKind(parent2);
            }
        }