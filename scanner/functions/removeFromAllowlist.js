function removeFromAllowlist(domain) {
        removeDomainFromAllowlist(domain);
        saveDomainsToLocalStorage();
        notifyAllowlistUpdated();
    }