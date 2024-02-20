function isUncheckedJSSuggestion(node, suggestion, excludeClasses) {
                const file = getSourceFileOfNode(node);
                if (file) {
                    if (compilerOptions.checkJs === void 0 && file.checkJsDirective === void 0 && (file.scriptKind === 1 /* JS */ || file.scriptKind === 2 /* JSX */)) {
                        const declarationFile = forEach(suggestion == null ? void 0 : suggestion.declarations, getSourceFileOfNode);
                        return !(file !== declarationFile && !!declarationFile && isGlobalSourceFile(declarationFile)) && !(excludeClasses && suggestion && suggestion.flags & 32 /* Class */) && !(!!node && excludeClasses && isPropertyAccessExpression(node) && node.expression.kind === 108 /* ThisKeyword */);
                    }
                }
                return false;
            }