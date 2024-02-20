function shouldAddTypeMetadata(node) {
                const kind = node.kind;
                return kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */ || kind === 169 /* PropertyDeclaration */;
            }