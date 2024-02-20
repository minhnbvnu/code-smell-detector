function makeStringLiteral(text, quotePreference) {
            return factory.createStringLiteral(text, quotePreference === 0 /* Single */);
        }