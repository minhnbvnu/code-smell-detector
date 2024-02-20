function isCommonJsRequire(node) {
                if (!isRequireCall(node, 
                /*checkArgumentIsStringLiteralLike*/
                true)) {
                    return false;
                }
                if (!isIdentifier(node.expression))
                    return Debug.fail();
                const resolvedRequire = resolveName(node.expression, node.expression.escapedText, 111551 /* Value */, 
                /*nameNotFoundMessage*/
                void 0, 
                /*nameArg*/
                void 0, 
                /*isUse*/
                true);
                if (resolvedRequire === requireSymbol) {
                    return true;
                }
                if (resolvedRequire.flags & 2097152 /* Alias */) {
                    return false;
                }
                const targetDeclarationKind = resolvedRequire.flags & 16 /* Function */ ? 259 /* FunctionDeclaration */ : resolvedRequire.flags & 3 /* Variable */ ? 257 /* VariableDeclaration */ : 0 /* Unknown */;
                if (targetDeclarationKind !== 0 /* Unknown */) {
                    const decl = getDeclarationOfKind(resolvedRequire, targetDeclarationKind);
                    return !!decl && !!(decl.flags & 16777216 /* Ambient */);
                }
                return false;
            }