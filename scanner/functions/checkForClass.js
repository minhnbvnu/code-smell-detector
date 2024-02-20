function checkForClass(node) {
                context.getDeclaredVariables(node).forEach(checkVariable);
            }