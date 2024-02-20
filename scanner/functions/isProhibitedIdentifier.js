function isProhibitedIdentifier(name) {
        return /^(alert|confirm|prompt)$/u.test(name);
    }