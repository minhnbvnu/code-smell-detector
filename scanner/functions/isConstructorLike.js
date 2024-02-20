function isConstructorLike(node) {
            switch (node.kind) {
                case 173 /* Constructor */:
                case 182 /* ConstructorType */:
                case 177 /* ConstructSignature */:
                    return true;
                default:
                    return false;
            }
        }