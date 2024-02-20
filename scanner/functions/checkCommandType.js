function checkCommandType(value, type, message, command) {
            if (!standardTypeEh(value, type)) {
                commandRaise('invalid parameter type' + encolon(message) +
                    '. expected ' + type + ', got ' + (typeof value), command || guessCommand());
            }
        }