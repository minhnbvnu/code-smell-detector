function shouldUseCreateElement(node) {
                return currentFileState.importSpecifier === void 0 || hasKeyAfterPropsSpread(node);
            }