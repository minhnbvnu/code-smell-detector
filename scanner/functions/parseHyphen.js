function parseHyphen(left, right, comparators) {
            const leftResult = parsePartial(left);
            if (!leftResult)
                return false;
            const rightResult = parsePartial(right);
            if (!rightResult)
                return false;
            if (!isWildcard(leftResult.major)) {
                comparators.push(createComparator(">=", leftResult.version));
            }
            if (!isWildcard(rightResult.major)) {
                comparators.push(isWildcard(rightResult.minor) ? createComparator("<", rightResult.version.increment("major")) : isWildcard(rightResult.patch) ? createComparator("<", rightResult.version.increment("minor")) : createComparator("<=", rightResult.version));
            }
            return true;
        }