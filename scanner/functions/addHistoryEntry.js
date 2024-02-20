function addHistoryEntry(baseUrl, newUrl, flexAppUrl) {

        //delete all the history entries
        forwardStack = [];

        if (browser.ie) {
            //Check to see if we are being asked to do a navigate for the first
            //history entry, and if so ignore, because it's coming from the creation
            //of the history iframe
            if (flexAppUrl == defaultHash && document.location.href == initialHref && window['_ie_firstload']) {
                currentHref = initialHref;
                return;
            }
            if ((!flexAppUrl || flexAppUrl == defaultHash) && window['_ie_firstload']) {
                newUrl = baseUrl + '#' + defaultHash;
                flexAppUrl = defaultHash;
            } else {
                // for IE, tell the history frame to go somewhere without a '#'
                // in order to get this entry into the browser history.
                getHistoryFrame().src = historyFrameSourcePrefix + flexAppUrl;
            }
            setHash(flexAppUrl);
        } else {

            //ADR
            if (backStack.length == 0 && initialState.flexAppUrl == flexAppUrl) {
                initialState = createState(baseUrl, newUrl, flexAppUrl);
            } else if(backStack.length > 0 && backStack[backStack.length - 1].flexAppUrl == flexAppUrl) {
                backStack[backStack.length - 1] = createState(baseUrl, newUrl, flexAppUrl);
            }

            if (browser.safari) {
                // for Safari, submit a form whose action points to the desired URL
                if (browser.version <= 419.3) {
                    var file = window.location.pathname.toString();
                    file = file.substring(file.lastIndexOf("/")+1);
                    getFormElement().innerHTML = '<form name="historyForm" action="'+file+'#' + flexAppUrl + '" method="GET"></form>';
                    //get the current elements and add them to the form
                    var qs = window.location.search.substring(1);
                    var qs_arr = qs.split("&");
                    for (var i = 0; i < qs_arr.length; i++) {
                        var tmp = qs_arr[i].split("=");
                        var elem = document.createElement("input");
                        elem.type = "hidden";
                        elem.name = tmp[0];
                        elem.value = tmp[1];
                        document.forms.historyForm.appendChild(elem);
                    }
                    document.forms.historyForm.submit();
                } else {
                    top.location.hash = flexAppUrl;
                }
                // We also have to maintain the history by hand for Safari
                historyHash[history.length] = flexAppUrl;
                _storeStates();
            } else {
                // Otherwise, write an anchor into the page and tell the browser to go there
                addAnchor(flexAppUrl);
                setHash(flexAppUrl);
            }
        }
        backStack.push(createState(baseUrl, newUrl, flexAppUrl));
    }