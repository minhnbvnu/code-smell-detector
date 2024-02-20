function makeFileLevelOptimisticUniqueName(name) {
                return makeUniqueName2(name, isFileLevelUniqueName2, 
                /*optimistic*/
                true, 
                /*scoped*/
                false, 
                /*privateName*/
                false, 
                /*prefix*/
                "", 
                /*suffix*/
                "");
            }