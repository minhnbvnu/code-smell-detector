function saveDomainsToLocalStorage() {
        localStorage.setItem(WHITE_LIST_DOMAINS_LS_PROP, JSON.stringify(allowlistDomainsHolder.domains));
        localStorage.setItem(BLOCK_LIST_DOMAINS_LS_PROP, JSON.stringify(blockListDomainsHolder.domains));
    }