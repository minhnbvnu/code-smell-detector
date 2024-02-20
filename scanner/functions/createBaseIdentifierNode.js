function createBaseIdentifierNode(kind) {
                return new (IdentifierConstructor2 || (IdentifierConstructor2 = objectAllocator.getIdentifierConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }