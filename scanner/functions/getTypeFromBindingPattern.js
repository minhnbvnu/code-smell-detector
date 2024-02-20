function getTypeFromBindingPattern(pattern, includePatternInType = false, reportErrors2 = false) {
                return pattern.kind === 203 /* ObjectBindingPattern */ ? getTypeFromObjectBindingPattern(pattern, includePatternInType, reportErrors2) : getTypeFromArrayBindingPattern(pattern, includePatternInType, reportErrors2);
            }