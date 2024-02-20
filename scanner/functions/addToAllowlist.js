function addToAllowlist(domain) {
        const rule = createAllowlistRule(domain);
        if (rule) {
            addDomainToAllowlist(domain);
            saveDomainsToLocalStorage();
            notifyAllowlistUpdated();
        }
    }