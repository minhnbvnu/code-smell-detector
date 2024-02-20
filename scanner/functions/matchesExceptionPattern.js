function matchesExceptionPattern(name) {
                return exceptionPatterns.some(pattern => pattern.test(name));
            }