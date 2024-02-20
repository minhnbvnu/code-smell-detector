function checkNonNullType(type, node) {
                return checkNonNullTypeWithReporter(type, node, reportObjectPossiblyNullOrUndefinedError);
            }