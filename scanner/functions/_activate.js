function _activate(tabId) {
        active = true;

        if (tabsWithExtensionEnabled.indexOf(tabId) === -1) {
            tabsWithExtensionEnabled.push(tabId);
        }

        _enableIcon();
        _activateTitle(tabId);
    }