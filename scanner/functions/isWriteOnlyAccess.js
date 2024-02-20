function isWriteOnlyAccess(node) {
            return accessKind(node) === 1 /* Write */;
        }