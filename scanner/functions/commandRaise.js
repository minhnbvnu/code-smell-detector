function commandRaise(message, command) {
            var callSite = guessCallSite();
            raise(message +
                ' in command ' + (command || guessCommand()) +
                (callSite === 'unknown' ? '' : ' called from ' + callSite));
        }