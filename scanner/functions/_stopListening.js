function _stopListening() {
        chrome.runtime.onMessage.removeListener(_handleHeaderUpdate);
    }