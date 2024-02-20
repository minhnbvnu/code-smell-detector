function getRightDirection(update, dir) {
                if (update.right.type === "UnaryExpression") {
                    if (update.right.operator === "-") {
                        return -dir;
                    }
                }
                else if (update.right.type === "Identifier") {
                    return 0;
                }
                return dir;
            }