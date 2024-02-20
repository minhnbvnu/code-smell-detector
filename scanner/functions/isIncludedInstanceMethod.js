function isIncludedInstanceMethod(node) {
                if (isInstanceMethod(node)) {
                    if (node.computed) {
                        return true;
                    }
                    const hashIfNeeded = node.key.type === "PrivateIdentifier" ? "#" : "";
                    const name = node.key.type === "Literal"
                        ? astUtils.getStaticStringValue(node.key)
                        : (node.key.name || "");
                    return !exceptMethods.has(hashIfNeeded + name);
                }
                return false;
            }