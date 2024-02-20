function getAssignmentDirection(update, counter) {
                if (update.left.name === counter) {
                    if (update.operator === "+=") {
                        return getRightDirection(update, 1);
                    }
                    if (update.operator === "-=") {
                        return getRightDirection(update, -1);
                    }
                }
                return 0;
            }