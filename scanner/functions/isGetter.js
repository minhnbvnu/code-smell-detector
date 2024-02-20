function isGetter(node) {
                const parent = node.parent;
                if (TARGET_NODE_TYPE.test(node.type) && node.body.type === "BlockStatement") {
                    if (parent.kind === "get") {
                        return true;
                    }
                    if (parent.type === "Property" && astUtils.getStaticPropertyName(parent) === "get" && parent.parent.type === "ObjectExpression") {
                        // Object.defineProperty() or Reflect.defineProperty()
                        if (parent.parent.parent.type === "CallExpression") {
                            const callNode = parent.parent.parent.callee;
                            if (astUtils.isSpecificMemberAccess(callNode, "Object", "defineProperty") ||
                                astUtils.isSpecificMemberAccess(callNode, "Reflect", "defineProperty")) {
                                return true;
                            }
                        }
                        // Object.defineProperties() or Object.create()
                        if (parent.parent.parent.type === "Property" &&
                            parent.parent.parent.parent.type === "ObjectExpression" &&
                            parent.parent.parent.parent.parent.type === "CallExpression") {
                            const callNode = parent.parent.parent.parent.parent.callee;
                            return astUtils.isSpecificMemberAccess(callNode, "Object", "defineProperties") ||
                                astUtils.isSpecificMemberAccess(callNode, "Object", "create");
                        }
                    }
                }
                return false;
            }