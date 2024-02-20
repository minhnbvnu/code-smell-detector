function getAnnotatedAccessorThisParameter(accessor) {
                const parameter = getAccessorThisParameter(accessor);
                return parameter && parameter.symbol;
            }