function escapeLeadingUnderscores(identifier) {
            return identifier.length >= 2 && identifier.charCodeAt(0) === 95 /* _ */ && identifier.charCodeAt(1) === 95 /* _ */ ? "_" + identifier : identifier;
        }