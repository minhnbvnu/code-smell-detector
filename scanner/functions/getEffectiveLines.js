function getEffectiveLines(getLineDifference) {
                Debug.assert(!!preserveSourceNewlines);
                const lines = getLineDifference(
                /*includeComments*/
                true);
                if (lines === 0) {
                    return getLineDifference(
                    /*includeComments*/
                    false);
                }
                return lines;
            }