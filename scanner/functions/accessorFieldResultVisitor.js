function accessorFieldResultVisitor(node) {
                switch (node.kind) {
                    case 169 /* PropertyDeclaration */:
                        return transformFieldInitializer(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return classElementVisitor(node);
                    default:
                        Debug.assertMissingNode(node, "Expected node to either be a PropertyDeclaration, GetAccessorDeclaration, or SetAccessorDeclaration");
                        break;
                }
            }