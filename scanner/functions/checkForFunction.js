function checkForFunction(node) {
                context.getDeclaredVariables(node).forEach(checkVariable);
            }