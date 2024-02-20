function getSortedEmitHelpers(node) {
                const helpers = getEmitHelpers(node);
                return helpers && stableSort(helpers, compareEmitHelpers);
            }