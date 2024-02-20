function isClassElement(node) {
            const kind = node.kind;
            return kind === 173 /* Constructor */ || kind === 169 /* PropertyDeclaration */ || kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */ || kind === 178 /* IndexSignature */ || kind === 172 /* ClassStaticBlockDeclaration */ || kind === 237 /* SemicolonClassElement */;
        }