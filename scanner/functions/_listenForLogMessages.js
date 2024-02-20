function _listenForLogMessages() {
        chrome.runtime.onMessage.addListener(_handleHeaderUpdate);
    }