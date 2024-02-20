function isJSDocConstructSignature(node) {
            const param = isJSDocFunctionType(node) ? firstOrUndefined(node.parameters) : void 0;
            const name = tryCast(param && param.name, isIdentifier);
            return !!name && name.escapedText === "new";
        }