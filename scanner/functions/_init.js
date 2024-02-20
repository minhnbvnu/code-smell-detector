function _init() {
        _listenForLogMessages();

        chrome.runtime.sendMessage('isActive', function(response) {
            if (response === false) {
                return _stopListening();
            }
            return _initStorage();
        });

        chrome.runtime.sendMessage('ready', function(queuedRequests) {
            if (queuedRequests) {
                for (var i = 0; i < queuedRequests.length; i++) {
                    if (use_queue) {
                        queue.push(queuedRequests[i]);
                        continue;
                    }
                    else {
                        _process(queuedRequests[i]);
                    }
                }
            }
        });
    }