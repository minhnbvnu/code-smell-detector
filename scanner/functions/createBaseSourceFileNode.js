function createBaseSourceFileNode(kind) {
                return new (SourceFileConstructor2 || (SourceFileConstructor2 = objectAllocator.getSourceFileConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }