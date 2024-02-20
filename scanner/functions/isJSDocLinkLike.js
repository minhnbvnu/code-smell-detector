function isJSDocLinkLike(node) {
            return node.kind === 327 /* JSDocLink */ || node.kind === 328 /* JSDocLinkCode */ || node.kind === 329 /* JSDocLinkPlain */;
        }