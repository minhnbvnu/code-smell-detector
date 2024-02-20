function _tabIsChrome(tab) {
        return disabledUrls.some(function (url) {
            return tab.url.indexOf(url) === 0;
        });
    }