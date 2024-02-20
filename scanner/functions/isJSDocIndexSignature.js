function isJSDocIndexSignature(node) {
            return isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "Object" && node.typeArguments && node.typeArguments.length === 2 && (node.typeArguments[0].kind === 152 /* StringKeyword */ || node.typeArguments[0].kind === 148 /* NumberKeyword */);
        }