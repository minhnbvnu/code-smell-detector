function generateNameForClassExpression() {
                return makeUniqueName2("class", isUniqueName, 
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