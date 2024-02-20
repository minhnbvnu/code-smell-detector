function visitParameter(node) {
                if (node.dotDotDotToken) {
                    return void 0;
                }
                else if (isBindingPattern(node.name)) {
                    return setOriginalNode(setTextRange(factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.getGeneratedNameForNode(node), 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0), 
                    /*location*/
                    node), 
                    /*original*/
                    node);
                }
                else if (node.initializer) {
                    return setOriginalNode(setTextRange(factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, node.name, 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0), 
                    /*location*/
                    node), 
                    /*original*/
                    node);
                }
                else {
                    return node;
                }
            }