function isFunctionOrConstructorTypeNode(node) {
            switch (node.kind) {
                case 181 /* FunctionType */:
                case 182 /* ConstructorType */:
                    return true;
            }
            return false;
        }