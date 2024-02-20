function _activateTitle(tabId) {
        chrome.browserAction.getTitle({tabId: tabId}, function(title) {
            chrome.browserAction.setTitle({
                title: title.replace(inactiveSuffix, ''),
                tabId: tabId
            });
        });
    }