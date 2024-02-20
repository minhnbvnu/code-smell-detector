function removeDomainFromAllowlist(domain) {
        if (!domain) {
            return;
        }
        if (isDefaultAllowlistMode()) {
            collections.removeAll(allowlistDomainsHolder.domains, domain);
        } else {
            collections.removeAll(blockListDomainsHolder.domains, domain);
        }
    }