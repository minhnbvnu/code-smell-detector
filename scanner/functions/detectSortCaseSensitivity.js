function detectSortCaseSensitivity(array, getString, compareStringsCaseSensitive2, compareStringsCaseInsensitive2) {
            let kind = 3 /* Both */;
            if (array.length < 2)
                return kind;
            let prevElement = getString(array[0]);
            for (let i = 1, len = array.length; i < len && kind !== 0 /* None */; i++) {
                const element = getString(array[i]);
                if (kind & 1 /* CaseSensitive */ && compareStringsCaseSensitive2(prevElement, element) > 0) {
                    kind &= ~1 /* CaseSensitive */;
                }
                if (kind & 2 /* CaseInsensitive */ && compareStringsCaseInsensitive2(prevElement, element) > 0) {
                    kind &= ~2 /* CaseInsensitive */;
                }
                prevElement = element;
            }
            return kind;
        }