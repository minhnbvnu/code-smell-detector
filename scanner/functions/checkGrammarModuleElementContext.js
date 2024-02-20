function checkGrammarModuleElementContext(node, errorMessage) {
                const isInAppropriateContext = node.parent.kind === 308 /* SourceFile */ || node.parent.kind === 265 /* ModuleBlock */ || node.parent.kind === 264 /* ModuleDeclaration */;
                if (!isInAppropriateContext) {
                    grammarErrorOnFirstToken(node, errorMessage);
                }
                return !isInAppropriateContext;
            }