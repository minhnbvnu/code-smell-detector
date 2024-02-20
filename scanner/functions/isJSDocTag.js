function isJSDocTag(node) {
            return node.kind >= 330 /* FirstJSDocTagNode */ && node.kind <= 353 /* LastJSDocTagNode */;
        }