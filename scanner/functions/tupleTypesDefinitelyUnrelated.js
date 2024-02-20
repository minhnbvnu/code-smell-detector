function tupleTypesDefinitelyUnrelated(source, target) {
                return !(target.target.combinedFlags & 8 /* Variadic */) && target.target.minLength > source.target.minLength || !target.target.hasRestElement && (source.target.hasRestElement || target.target.fixedLength < source.target.fixedLength);
            }