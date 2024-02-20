function insertLeadingStatement(factory2, dest, source) {
            if (isBlock(dest)) {
                return factory2.updateBlock(dest, setTextRange(factory2.createNodeArray([source, ...dest.statements]), dest.statements));
            }
            else {
                return factory2.createBlock(factory2.createNodeArray([dest, source]), 
                /*multiLine*/
                true);
            }
        }