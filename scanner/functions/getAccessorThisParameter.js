function getAccessorThisParameter(accessor) {
                if (accessor.parameters.length === (accessor.kind === 174 /* GetAccessor */ ? 1 : 2)) {
                    return getThisParameter(accessor);
                }
            }