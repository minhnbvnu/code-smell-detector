function doesAccessorHaveCorrectParameterCount(accessor) {
                return getAccessorThisParameter(accessor) || accessor.parameters.length === (accessor.kind === 174 /* GetAccessor */ ? 0 : 1);
            }