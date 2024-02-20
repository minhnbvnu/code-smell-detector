function isPromiseRejectCall(node) {
                return astUtils.isSpecificMemberAccess(node.callee, "Promise", "reject");
            }