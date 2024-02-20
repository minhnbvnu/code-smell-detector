function equalOwnProperties(left, right, equalityComparer = equateValues) {
            if (left === right)
                return true;
            if (!left || !right)
                return false;
            for (const key in left) {
                if (hasOwnProperty.call(left, key)) {
                    if (!hasOwnProperty.call(right, key))
                        return false;
                    if (!equalityComparer(left[key], right[key]))
                        return false;
                }
            }
            for (const key in right) {
                if (hasOwnProperty.call(right, key)) {
                    if (!hasOwnProperty.call(left, key))
                        return false;
                }
            }
            return true;
        }