function addDomainToAllowlist(domain) {
        if (!domain) {
            return;
        }
        if (isDefaultAllowlistMode()) {
            allowlistDomainsHolder.add(domain);
        } else {
            blockListDomainsHolder.add(domain);
        }
    }