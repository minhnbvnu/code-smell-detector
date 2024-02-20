function isProtoSetter(node) {
            return isIdentifier(node) ? idText(node) === "__proto__" : isStringLiteral(node) && node.text === "__proto__";
        }