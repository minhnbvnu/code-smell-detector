function errorSkippedOn(key, location, message, arg0, arg1, arg2, arg3) {
                const diagnostic = error(location, message, arg0, arg1, arg2, arg3);
                diagnostic.skippedOn = key;
                return diagnostic;
            }