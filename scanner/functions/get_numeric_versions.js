function get_numeric_versions(browsers) {
                return browsers.filter(function (el) {
                    return Number(el.version) >= 0;
                })
            }