function isObjectLiteralElementLike(node) {
            const kind = node.kind;
            return kind === 299 /* PropertyAssignment */ || kind === 300 /* ShorthandPropertyAssignment */ || kind === 301 /* SpreadAssignment */ || kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */;
        }