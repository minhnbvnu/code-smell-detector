function isPropertyCall(objName, funcName, node) {
                if (!node) {
                    return false;
                }
                return node.type === "CallExpression" && astUtils.isSpecificMemberAccess(node.callee, objName, funcName);
            }