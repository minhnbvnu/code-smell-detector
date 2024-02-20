function _storeStates() {
        if (browser.safari) {
            getRememberElement().value = historyHash.join(",");
        }
    }