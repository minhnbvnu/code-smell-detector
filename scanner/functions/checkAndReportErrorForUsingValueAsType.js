function checkAndReportErrorForUsingValueAsType(errorLocation, name, meaning) {
                if (meaning & (788968 /* Type */ & ~1920 /* Namespace */)) {
                    const symbol = resolveSymbol(resolveName(errorLocation, name, ~788968 /* Type */ & 111551 /* Value */, 
                    /*nameNotFoundMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    false));
                    if (symbol && !(symbol.flags & 1920 /* Namespace */)) {
                        error(errorLocation, Diagnostics._0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0, unescapeLeadingUnderscores(name));
                        return true;
                    }
                }
                return false;
            }