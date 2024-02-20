function nodeStartsNewLexicalEnvironment(node) {
            const kind = node.kind;
            return kind === 173 /* Constructor */ || kind === 215 /* FunctionExpression */ || kind === 259 /* FunctionDeclaration */ || kind === 216 /* ArrowFunction */ || kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */ || kind === 264 /* ModuleDeclaration */ || kind === 308 /* SourceFile */;
        }