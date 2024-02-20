function addProfile(browser) {
                if (req.firefox_profile) {
                    return xtend(browser, {
                        firefox_profile: req.firefox_profile
                    });
                }

                return browser;
            }