function generateNameForModuleOrEnum(node) {
                const name = getTextOfNode2(node.name);
                return isUniqueLocalName(name, tryCast(node, canHaveLocals)) ? name : makeUniqueName2(name, isUniqueName, 
                /*optimistic*/
                false, 
                /*scoped*/
                false, 
                /*privateName*/
                false, 
                /*prefix*/
                "", 
                /*suffix*/
                "");
            }