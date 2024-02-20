function attachDebugPrototypeIfDebug(mapper) {
                        if (Debug2.isDebugging) {
                            return Object.setPrototypeOf(mapper, DebugTypeMapper.prototype);
                        }
                        return mapper;
                    }