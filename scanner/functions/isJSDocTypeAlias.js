function isJSDocTypeAlias(node) {
            return node.kind === 349 /* JSDocTypedefTag */ || node.kind === 341 /* JSDocCallbackTag */ || node.kind === 343 /* JSDocEnumTag */;
        }