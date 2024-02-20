function isJSDocPropertyLikeTag(node) {
            return node.kind === 351 /* JSDocPropertyTag */ || node.kind === 344 /* JSDocParameterTag */;
        }