function checkConditionsInGroup(conditions) {
                if (conditions.every(isUnmodified)) {
                    conditions.forEach(report);
                }
            }