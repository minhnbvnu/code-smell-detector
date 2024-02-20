function getUpdateDirection(update, counter) {
                if (update.argument.type === "Identifier" && update.argument.name === counter) {
                    if (update.operator === "++") {
                        return 1;
                    }
                    if (update.operator === "--") {
                        return -1;
                    }
                }
                return 0;
            }