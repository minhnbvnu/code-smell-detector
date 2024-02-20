function doOutsideOfContext(context, func) {
                        const contextFlagsToClear = context & contextFlags;
                        if (contextFlagsToClear) {
                            setContextFlag(
                            /*val*/
                            false, contextFlagsToClear);
                            const result = func();
                            setContextFlag(
                            /*val*/
                            true, contextFlagsToClear);
                            return result;
                        }
                        return func();
                    }