function checkParameterCommand(param, possibilities, message, command) {
            if (!(param in possibilities)) {
                commandRaise('unknown parameter (' + param + ')' + encolon(message) +
                    '. possible values: ' + Object.keys(possibilities).join(), command || guessCommand());
            }
        }