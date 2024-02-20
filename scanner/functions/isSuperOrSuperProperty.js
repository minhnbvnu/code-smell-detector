function isSuperOrSuperProperty(node) {
            return node.kind === 106 /* SuperKeyword */ || isSuperProperty(node);
        }