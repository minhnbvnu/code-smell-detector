function checkCommand(pred, message, command) {
            if (!pred) {
                commandRaise(message, command || guessCommand());
            }
        }