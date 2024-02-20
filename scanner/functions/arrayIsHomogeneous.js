function arrayIsHomogeneous(array, comparer = equateValues) {
            if (array.length < 2)
                return true;
            const first2 = array[0];
            for (let i = 1, length2 = array.length; i < length2; i++) {
                const target = array[i];
                if (!comparer(first2, target))
                    return false;
            }
            return true;
        }