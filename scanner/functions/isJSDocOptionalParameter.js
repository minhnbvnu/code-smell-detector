function isJSDocOptionalParameter(node) {
            return isInJSFile(node) && // node.type should only be a JSDocOptionalType when node is a parameter of a JSDocFunctionType
                (node.type && node.type.kind === 319 /* JSDocOptionalType */ || getJSDocParameterTags(node).some(({ isBracketed, typeExpression }) => isBracketed || !!typeExpression && typeExpression.type.kind === 319 /* JSDocOptionalType */));
        }