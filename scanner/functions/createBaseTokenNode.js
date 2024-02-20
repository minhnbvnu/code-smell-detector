function createBaseTokenNode(kind) {
                return new (TokenConstructor2 || (TokenConstructor2 = objectAllocator.getTokenConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }