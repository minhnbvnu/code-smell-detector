function _handleTabActivated(activeInfo) {
        // This is sometimes undefined but an integer is required for chrome.tabs.get
        if (typeof activeInfo.tabId != 'number') {
            return;
        }

        chrome.tabs.get(activeInfo.tabId, _handleTabEvent);
    }