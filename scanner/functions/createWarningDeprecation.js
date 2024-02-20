function createWarningDeprecation(name, errorAfter, since, message) {
            let hasWrittenDeprecation = false;
            return () => {
                if (enableDeprecationWarnings && !hasWrittenDeprecation) {
                    Debug.log.warn(formatDeprecationMessage(name, 
                    /*error*/
                    false, errorAfter, since, message));
                    hasWrittenDeprecation = true;
                }
            };
        }