function isPropertyAccessOrQualifiedNameOrImportTypeNode(node) {
            const kind = node.kind;
            return kind === 208 /* PropertyAccessExpression */ || kind === 163 /* QualifiedName */ || kind === 202 /* ImportType */;
        }