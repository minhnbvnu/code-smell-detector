function checkAndReportErrorForUsingNamespaceAsTypeOrValue(errorLocation, name, meaning) {
                if (meaning & (111551 /* Value */ & ~788968 /* Type */)) {
                    const symbol = resolveSymbol(resolveName(errorLocation, name, 1024 /* NamespaceModule */, 
                    /*nameNotFoundMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    false));
                    if (symbol) {
                        error(errorLocation, Diagnostics.Cannot_use_namespace_0_as_a_value, unescapeLeadingUnderscores(name));
                        return true;
                    }
                }
                else if (meaning & (788968 /* Type */ & ~111551 /* Value */)) {
                    const symbol = resolveSymbol(resolveName(errorLocation, name, 1536 /* Module */, 
                    /*nameNotFoundMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    false));
                    if (symbol) {
                        error(errorLocation, Diagnostics.Cannot_use_namespace_0_as_a_type, unescapeLeadingUnderscores(name));
                        return true;
                    }
                }
                return false;
            }