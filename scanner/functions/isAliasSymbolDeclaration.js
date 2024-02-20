function isAliasSymbolDeclaration(node) {
            if (node.kind === 268 /* ImportEqualsDeclaration */ || node.kind === 267 /* NamespaceExportDeclaration */ || node.kind === 270 /* ImportClause */ && !!node.name || node.kind === 271 /* NamespaceImport */ || node.kind === 277 /* NamespaceExport */ || node.kind === 273 /* ImportSpecifier */ || node.kind === 278 /* ExportSpecifier */ || node.kind === 274 /* ExportAssignment */ && exportAssignmentIsAlias(node)) {
                return true;
            }
            return isInJSFile(node) && (isBinaryExpression(node) && getAssignmentDeclarationKind(node) === 2 /* ModuleExports */ && exportAssignmentIsAlias(node) || isPropertyAccessExpression(node) && isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === 63 /* EqualsToken */ && isAliasableExpression(node.parent.right));
        }