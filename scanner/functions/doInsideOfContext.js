function doInsideOfContext(context, func) {
                        const contextFlagsToSet = context & ~contextFlags;
                        if (contextFlagsToSet) {
                            setContextFlag(
                            /*val*/
                            true, contextFlagsToSet);
                            const result = func();
                            setContextFlag(
                            /*val*/
                            false, contextFlagsToSet);
                            return result;
                        }
                        return func();
                    }