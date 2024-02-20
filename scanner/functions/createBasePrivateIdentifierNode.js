function createBasePrivateIdentifierNode(kind) {
                return new (PrivateIdentifierConstructor2 || (PrivateIdentifierConstructor2 = objectAllocator.getPrivateIdentifierConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }