function checkForUrlChange() {

        if (browser.ie) {
            if (currentHref != document.location.href && currentHref + '#' != document.location.href) {
                //This occurs when the user has navigated to a specific URL
                //within the app, and didn't use browser back/forward
                //IE seems to have a bug where it stops updating the URL it
                //shows the end-user at this point, but programatically it
                //appears to be correct.  Do a full app reload to get around
                //this issue.
                if (browser.version < 7) {
                    currentHref = document.location.href;
                    document.location.reload();
                } else {
					if (getHash() != getIframeHash()) {
						// this.iframe.src = this.blankURL + hash;
						var sourceToSet = historyFrameSourcePrefix + getHash();
						getHistoryFrame().src = sourceToSet;
					}
                }
            }
        }

        if (browser.safari) {
            // For Safari, we have to check to see if history.length changed.
            if (currentHistoryLength >= 0 && history.length != currentHistoryLength) {
                //alert("did change: " + history.length + ", " + historyHash.length + "|" + historyHash[history.length] + "|>" + historyHash.join("|"));
                // If it did change, then we have to look the old state up
                // in our hand-maintained array since document.location.hash
                // won't have changed, then call back into BrowserManager.
                currentHistoryLength = history.length;
                var flexAppUrl = historyHash[currentHistoryLength];
                if (flexAppUrl == '') {
                    //flexAppUrl = defaultHash;
                }
                //ADR: to fix multiple
                if (typeof BrowserHistory_multiple != "undefined" && BrowserHistory_multiple == true) {
                    var pl = getPlayers();
                    for (var i = 0; i < pl.length; i++) {
                        pl[i].browserURLChange(flexAppUrl);
                    }
                } else {
                    getPlayer().browserURLChange(flexAppUrl);
                }
                _storeStates();
            }
        }
        if (browser.firefox) {
            if (currentHref != document.location.href) {
                var bsl = backStack.length;

                var urlActions = {
                    back: false, 
                    forward: false, 
                    set: false
                }

                if ((window.location.hash == initialHash || window.location.href == initialHref) && (bsl == 1)) {
                    urlActions.back = true;
                    // FIXME: could this ever be a forward button?
                    // we can't clear it because we still need to check for forwards. Ugg.
                    // clearInterval(this.locationTimer);
                    handleBackButton();
                }
                
                // first check to see if we could have gone forward. We always halt on
                // a no-hash item.
                if (forwardStack.length > 0) {
                    if (forwardStack[forwardStack.length-1].flexAppUrl == getHash()) {
                        urlActions.forward = true;
                        handleForwardButton();
                    }
                }

                // ok, that didn't work, try someplace back in the history stack
                if ((bsl >= 2) && (backStack[bsl - 2])) {
                    if (backStack[bsl - 2].flexAppUrl == getHash()) {
                        urlActions.back = true;
                        handleBackButton();
                    }
                }
                
                if (!urlActions.back && !urlActions.forward) {
                    var foundInStacks = {
                        back: -1, 
                        forward: -1
                    }

                    for (var i = 0; i < backStack.length; i++) {
                        if (backStack[i].flexAppUrl == getHash() && i != (bsl - 2)) {
                            arbitraryUrl = true;
                            foundInStacks.back = i;
                        }
                    }
                    for (var i = 0; i < forwardStack.length; i++) {
                        if (forwardStack[i].flexAppUrl == getHash() && i != (bsl - 2)) {
                            arbitraryUrl = true;
                            foundInStacks.forward = i;
                        }
                    }
                    handleArbitraryUrl();
                }

                // Firefox changed; do a callback into BrowserManager to tell it.
                currentHref = document.location.href;
                var flexAppUrl = getHash();
                if (flexAppUrl == '') {
                    //flexAppUrl = defaultHash;
                }
                //ADR: to fix multiple
                if (typeof BrowserHistory_multiple != "undefined" && BrowserHistory_multiple == true) {
                    var pl = getPlayers();
                    for (var i = 0; i < pl.length; i++) {
                        pl[i].browserURLChange(flexAppUrl);
                    }
                } else {
                    getPlayer().browserURLChange(flexAppUrl);
                }
            }
        }
        //setTimeout(checkForUrlChange, 50);
    }