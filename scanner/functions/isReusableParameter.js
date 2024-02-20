function isReusableParameter(node) {
                        if (node.kind !== 166 /* Parameter */) {
                            return false;
                        }
                        const parameter = node;
                        return parameter.initializer === void 0;
                    }