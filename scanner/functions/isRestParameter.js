function isRestParameter(node) {
            const type = isJSDocParameterTag(node) ? node.typeExpression && node.typeExpression.type : node.type;
            return node.dotDotDotToken !== void 0 || !!type && type.kind === 321 /* JSDocVariadicType */;
        }