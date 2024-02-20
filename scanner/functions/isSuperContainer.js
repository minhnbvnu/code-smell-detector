function isSuperContainer(node) {
                const kind = node.kind;
                return kind === 260 /* ClassDeclaration */ || kind === 173 /* Constructor */ || kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */;
            }