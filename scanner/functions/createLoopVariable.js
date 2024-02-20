function createLoopVariable(reservedInNestedScopes) {
                let flags2 = 2 /* Loop */;
                if (reservedInNestedScopes)
                    flags2 |= 8 /* ReservedInNestedScopes */;
                return createBaseGeneratedIdentifier("", flags2, 
                /*prefix*/
                void 0, 
                /*suffix*/
                void 0);
            }