function getHoistedFunctionName(node) {
                Debug.assert(isPrivateIdentifier(node.name));
                const info = accessPrivateIdentifier2(node.name);
                Debug.assert(info, "Undeclared private name for property declaration.");
                if (info.kind === "m" /* Method */) {
                    return info.methodName;
                }
                if (info.kind === "a" /* Accessor */) {
                    if (isGetAccessor(node)) {
                        return info.getterName;
                    }
                    if (isSetAccessor(node)) {
                        return info.setterName;
                    }
                }
            }