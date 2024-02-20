function withProgramOrEmptyArray(action) {
                return withProgramOrUndefined(action) || emptyArray;
            }