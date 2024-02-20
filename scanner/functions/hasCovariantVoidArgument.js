function hasCovariantVoidArgument(typeArguments, variances) {
                for (let i = 0; i < variances.length; i++) {
                    if ((variances[i] & 7 /* VarianceMask */) === 1 /* Covariant */ && typeArguments[i].flags & 16384 /* Void */) {
                        return true;
                    }
                }
                return false;
            }