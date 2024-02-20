function validateRegExpPattern(pattern, uFlag) {
                try {
                    validator.validatePattern(pattern, undefined1, undefined1, uFlag);
                    return null;
                }
                catch (err) {
                    return err.message;
                }
            }