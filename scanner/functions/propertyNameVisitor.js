function propertyNameVisitor(node) {
                switch (node.kind) {
                    case 164 /* ComputedPropertyName */:
                        return visitComputedPropertyName(node);
                    default:
                        return visitor(node);
                }
            }