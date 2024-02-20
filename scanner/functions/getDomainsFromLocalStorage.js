function getDomainsFromLocalStorage(prop) {
        let domains = [];
        try {
            const json = localStorage.getItem(prop);
            if (json) {
                domains = JSON.parse(json);
            }
        } catch (ex) {
            log.error('Error retrieve allowlist domains {0}, cause {1}', prop, ex);
        }
        return domains;
    }