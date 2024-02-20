function _addListeners() {
        var queuedRequests = {};
        chrome.browserAction.onClicked.addListener(_handleIconClick);
        chrome.tabs.onActivated.addListener(_handleTabActivated);
        chrome.tabs.onCreated.addListener(_handleTabEvent);
        chrome.tabs.onUpdated.addListener(_handleTabUpdated);

        chrome.webRequest.onResponseStarted.addListener(function(details) {
            if (tabsWithExtensionEnabled.indexOf(details.tabId) !== -1) {
                chrome.tabs.sendMessage(details.tabId, {name: "header_update", details: details}, function(response) {
                    // Previously this would only queue up the header updates
                    // if the content script did not send back a response. This
                    // meant that presumably that it had not yet attached its
                    // listener to this message.
                    //
                    // It seems like after a recent Chrome update, it is
                    // possible for the response to be started for a new request
                    // while the current content script is still receiving
                    // messages. This means the current content script will log
                    // the messages to the console and then after the page is
                    // refreshed and re-rendered the console will be cleared.
                    //
                    // By always appending these messages to queuedRequests, it
                    // should mean that any time the content script is ready
                    // (when it is first loaded) it will process the requests
                    // that are inside this array.
                    //
                    // I feel like this could potentially introduce some strange
                    // behavior. It does lead to a flash where you can see the
                    // logs on the previous request before the page refreshes.
                    if (!queuedRequests[details.tabId]) {
                        queuedRequests[details.tabId] = [];
                    }

                    queuedRequests[details.tabId].push(details);
                });
            }
        }, {urls: ["<all_urls>"]}, ["responseHeaders"]);

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request === "localStorage") {
                return sendResponse(localStorage);
            }

            if (request === "isActive") {
                return sendResponse(active);
            }

            if (request === "ready") {
                var queuedRequestsForTab = [];
                if (queuedRequests[sender.tab.id]) {
                    queuedRequestsForTab = queuedRequests[sender.tab.id];
                    delete queuedRequests[sender.tab.id];
                }

                sendResponse(queuedRequestsForTab);
                return;
            }
        });
    }