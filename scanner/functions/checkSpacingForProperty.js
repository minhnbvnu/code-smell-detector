function checkSpacingForProperty(node) {
                if (node.static) {
                    checkSpacingAroundFirstToken(node);
                }
                if (node.kind === "get" ||
                    node.kind === "set" ||
                    ((node.method || node.type === "MethodDefinition") &&
                        node.value.async)) {
                    const token = sourceCode.getTokenBefore(node.key, tok => {
                        switch (tok.value) {
                            case "get":
                            case "set":
                            case "async":
                                return true;
                            default:
                                return false;
                        }
                    });
                    if (!token) {
                        throw new Error("Failed to find token get, set, or async beside method name");
                    }
                    checkSpacingAround(token);
                }
            }