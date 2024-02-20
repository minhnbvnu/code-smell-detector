function doWithContext(flags, cb, value) {
                const contextFlagsToSet = flags & ~contextFlags;
                if (contextFlagsToSet) {
                    setContextFlag(contextFlagsToSet, 
                    /*val*/
                    true);
                    const result = cb(value);
                    setContextFlag(contextFlagsToSet, 
                    /*val*/
                    false);
                    return result;
                }
                return cb(value);
            }