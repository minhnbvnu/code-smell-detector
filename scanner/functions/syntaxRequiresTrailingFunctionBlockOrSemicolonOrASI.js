function syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind) {
            return kind === 259 /* FunctionDeclaration */ || kind === 173 /* Constructor */ || kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */;
        }