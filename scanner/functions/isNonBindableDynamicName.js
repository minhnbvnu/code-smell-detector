function isNonBindableDynamicName(node) {
                return isDynamicName(node) && !isLateBindableName(node);
            }