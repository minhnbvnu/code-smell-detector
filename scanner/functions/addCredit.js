function addCredit(type, assetURL, license) {
        license = canonicalizeLicense(license);
        if (! cache[type].has(license)) {
            cache[type].set(license, []);
        }
        cache[type].get(license).push(urlFile(assetURL).replace(/\.[^\.]+\.json$/, ''));
    }