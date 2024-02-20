function getCallbackInfo(node) {
        const retv = { isCallback: false, isLexicalThis: false };
        let currentNode = node;
        let parent = node.parent;
        let bound = false;
        while (currentNode) {
            switch (parent.type) {
                // Checks parents recursively.
                case "LogicalExpression":
                case "ChainExpression":
                case "ConditionalExpression":
                    break;
                // Checks whether the parent node is `.bind(this)` call.
                case "MemberExpression":
                    if (parent.object === currentNode &&
                        !parent.property.computed &&
                        parent.property.type === "Identifier" &&
                        parent.property.name === "bind") {
                        const maybeCallee = parent.parent.type === "ChainExpression"
                            ? parent.parent
                            : parent;
                        if (astUtils.isCallee(maybeCallee)) {
                            if (!bound) {
                                bound = true; // Use only the first `.bind()` to make `isLexicalThis` value.
                                retv.isLexicalThis = (maybeCallee.parent.arguments.length === 1 &&
                                    maybeCallee.parent.arguments[0].type === "ThisExpression");
                            }
                            parent = maybeCallee.parent;
                        }
                        else {
                            return retv;
                        }
                    }
                    else {
                        return retv;
                    }
                    break;
                // Checks whether the node is a callback.
                case "CallExpression":
                case "NewExpression":
                    if (parent.callee !== currentNode) {
                        retv.isCallback = true;
                    }
                    return retv;
                default:
                    return retv;
            }
            currentNode = parent;
            parent = parent.parent;
        }
        /* c8 ignore next */
        throw new Error("unreachable");
    }