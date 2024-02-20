function createTempVariable(recordTempVariable, reservedInNestedScopes, prefix, suffix) {
                let flags2 = 1 /* Auto */;
                if (reservedInNestedScopes)
                    flags2 |= 8 /* ReservedInNestedScopes */;
                const name = createBaseGeneratedIdentifier("", flags2, prefix, suffix);
                if (recordTempVariable) {
                    recordTempVariable(name);
                }
                return name;
            }