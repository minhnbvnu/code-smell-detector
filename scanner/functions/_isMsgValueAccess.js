function _isMsgValueAccess(node) {
            return node.object.name === "msg" && node.property.name === "value";
        }