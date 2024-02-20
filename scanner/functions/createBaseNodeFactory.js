function createBaseNodeFactory() {
            let NodeConstructor2;
            let TokenConstructor2;
            let IdentifierConstructor2;
            let PrivateIdentifierConstructor2;
            let SourceFileConstructor2;
            return {
                createBaseSourceFileNode,
                createBaseIdentifierNode,
                createBasePrivateIdentifierNode,
                createBaseTokenNode,
                createBaseNode
            };
            function createBaseSourceFileNode(kind) {
                return new (SourceFileConstructor2 || (SourceFileConstructor2 = objectAllocator.getSourceFileConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }
            function createBaseIdentifierNode(kind) {
                return new (IdentifierConstructor2 || (IdentifierConstructor2 = objectAllocator.getIdentifierConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }
            function createBasePrivateIdentifierNode(kind) {
                return new (PrivateIdentifierConstructor2 || (PrivateIdentifierConstructor2 = objectAllocator.getPrivateIdentifierConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }
            function createBaseTokenNode(kind) {
                return new (TokenConstructor2 || (TokenConstructor2 = objectAllocator.getTokenConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }
            function createBaseNode(kind) {
                return new (NodeConstructor2 || (NodeConstructor2 = objectAllocator.getNodeConstructor()))(kind, 
                /*pos*/
                -1, 
                /*end*/
                -1);
            }
        }