function removeEmitHelper(node, helper) {
            var _a2;
            const helpers = (_a2 = node.emitNode) == null ? void 0 : _a2.helpers;
            if (helpers) {
                return orderedRemoveItem(helpers, helper);
            }
            return false;
        }