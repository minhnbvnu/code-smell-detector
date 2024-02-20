function isUnknownOptionAsArg(arg) {
                return configuration['unknown-options-as-args'] && isUnknownOption(arg);
            }