function hasBindableName(node) {
                return !hasDynamicName(node) || hasLateBindableName(node);
            }