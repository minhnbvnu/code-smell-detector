function DEFPRINT(nodetype, generator) {
                nodetype.DEFMETHOD("_codegen", generator);
            }