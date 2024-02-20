function createAllowlistRule(domain) {
        if (!domain) {
            return null;
        }

        // don't create rule for comments
        if (domain.startsWith('!')) {
            return null;
        }

        // https://github.com/AdguardTeam/AdGuardForSafari/issues/346
        if (domain.startsWith('localhost')) {
            return `@@${domain}$document`;
        }

        return `@@||${domain}$document`;
    }