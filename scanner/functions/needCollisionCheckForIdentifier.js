function needCollisionCheckForIdentifier(node, identifier, name) {
                if ((identifier == null ? void 0 : identifier.escapedText) !== name) {
                    return false;
                }
                if (node.kind === 169 /* PropertyDeclaration */ || node.kind === 168 /* PropertySignature */ || node.kind === 171 /* MethodDeclaration */ || node.kind === 170 /* MethodSignature */ || node.kind === 174 /* GetAccessor */ || node.kind === 175 /* SetAccessor */ || node.kind === 299 /* PropertyAssignment */) {
                    return false;
                }
                if (node.flags & 16777216 /* Ambient */) {
                    return false;
                }
                if (isImportClause(node) || isImportEqualsDeclaration(node) || isImportSpecifier(node)) {
                    if (isTypeOnlyImportOrExportDeclaration(node)) {
                        return false;
                    }
                }
                const root = getRootDeclaration(node);
                if (isParameter(root) && nodeIsMissing(root.parent.body)) {
                    return false;
                }
                return true;
            }