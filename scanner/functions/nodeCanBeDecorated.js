function nodeCanBeDecorated(useLegacyDecorators, node, parent2, grandparent) {
            if (useLegacyDecorators && isNamedDeclaration(node) && isPrivateIdentifier(node.name)) {
                return false;
            }
            switch (node.kind) {
                case 260 /* ClassDeclaration */:
                    return true;
                case 228 /* ClassExpression */:
                    return !useLegacyDecorators;
                case 169 /* PropertyDeclaration */:
                    return parent2 !== void 0 && (useLegacyDecorators ? isClassDeclaration(parent2) : isClassLike(parent2) && !hasAbstractModifier(node) && !hasAmbientModifier(node));
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 171 /* MethodDeclaration */:
                    return node.body !== void 0 && parent2 !== void 0 && (useLegacyDecorators ? isClassDeclaration(parent2) : isClassLike(parent2));
                case 166 /* Parameter */:
                    if (!useLegacyDecorators)
                        return false;
                    return parent2 !== void 0 && parent2.body !== void 0 && (parent2.kind === 173 /* Constructor */ || parent2.kind === 171 /* MethodDeclaration */ || parent2.kind === 175 /* SetAccessor */) && getThisParameter(parent2) !== node && grandparent !== void 0 && grandparent.kind === 260 /* ClassDeclaration */;
            }
            return false;
        }