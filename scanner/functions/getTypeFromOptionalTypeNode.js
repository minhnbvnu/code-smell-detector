function getTypeFromOptionalTypeNode(node) {
                return addOptionality(getTypeFromTypeNode(node.type), 
                /*isProperty*/
                true);
            }