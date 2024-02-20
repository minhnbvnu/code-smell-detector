function isVariableLike(node) {
            if (node) {
                switch (node.kind) {
                    case 205 /* BindingElement */:
                    case 302 /* EnumMember */:
                    case 166 /* Parameter */:
                    case 299 /* PropertyAssignment */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                    case 300 /* ShorthandPropertyAssignment */:
                    case 257 /* VariableDeclaration */:
                        return true;
                }
            }
            return false;
        }