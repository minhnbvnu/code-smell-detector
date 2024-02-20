function should_retain(compressor, def) {
                if (def.references.length)
                    return true;
                if (!def.global)
                    return false;
                if (compressor.toplevel.vars) {
                    if (compressor.top_retain) {
                        return compressor.top_retain(def);
                    }
                    return false;
                }
                return true;
            }