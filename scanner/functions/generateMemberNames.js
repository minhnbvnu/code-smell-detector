function generateMemberNames(node) {
                if (!node)
                    return;
                switch (node.kind) {
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                    case 169 /* PropertyDeclaration */:
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        generateNameIfNeeded(node.name);
                        break;
                }
            }