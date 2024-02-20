function setContextFlag(flag, val) {
                contextFlags = val ? contextFlags | flag : contextFlags & ~flag;
            }