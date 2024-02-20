function isJSDocNode(node) {
            return node.kind >= 312 /* FirstJSDocNode */ && node.kind <= 353 /* LastJSDocNode */;
        }