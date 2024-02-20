function process_version_str(version) {
            version = String(version);
            if (version === 'latest') {
                if (Array.isArray(req.platform)) {
                    var latest = get_numeric_versions(avail).slice(-1)[0].version;
                    return avail.filter(function(browser) {
                        return browser.version === latest;
                    });
                }
                else {
                    return get_numeric_versions(avail).slice(-1).map(addProfile);
                }
            }
            else if (version === 'oldest') {
                if (Array.isArray(req.platform)) {
                    var oldest = get_numeric_versions(avail).slice(0, 1)[0].version;
                    return avail.filter(function(browser) {
                        return browser.version === oldest;
                    });
                }
                else {
                    return avail.slice(0, 1).map(addProfile);
                }
            }

            // split version string on two dots to see if range was specified
            var split = version.split('..');

            // range specified via ##..##
            if (split.length === 2) {
                var start = split[0];
                var end = split[1];

                var start_idx = 0;
                var end_idx = avail.length - 1;

                var v_map = avail.map(function(item) {
                    return item.version;
                });

                if (end === 'latest') {
                    end_idx = get_numeric_versions(avail).length - 1;
                }
                else {
                    end_idx = v_map.lastIndexOf(end);
                }

                if (start < 0) {
                    start_idx = end_idx + Number(start);
                }
                else if (start !== 'oldest') {
                    start_idx = v_map.indexOf(start);
                }

                if (start_idx < 0) {
                    throw new Error('unable to find start version: ' + start);
                }
                else if (end_idx < 0) {
                    throw new Error('unable to find end version: ' + end);
                }

                return avail.slice(start_idx, end_idx + 1).map(addProfile);
            }

            return avail.filter(function(browser) {
                // JS will forget about the .0 when reading any float that can
                // be represented as an integer from yaml, so let's try to
                // match a version of that form as a fallback
                return browser.version == version || browser.version == version + '.0';
            }).map(addProfile);

            function get_numeric_versions(browsers) {
                return browsers.filter(function (el) {
                    return Number(el.version) >= 0;
                })
            }

            function addProfile(browser) {
                if (req.firefox_profile) {
                    return xtend(browser, {
                        firefox_profile: req.firefox_profile
                    });
                }

                return browser;
            }
        }