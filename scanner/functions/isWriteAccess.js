function isWriteAccess(node) {
            return accessKind(node) !== 0 /* Read */;
        }