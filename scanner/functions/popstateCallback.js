function popstateCallback (evt) {
        var require_url;
        if (evt === undefined) {
            // attempt to select an nbextension specified by a URL search parameter
            var queries = window.location.search.replace(/^\?/, '').split('&');
            for (var ii = 0; ii < queries.length; ii++) {
                var keyValuePair = queries[ii].split('=');
                if (decodeURIComponent(keyValuePair[0]) === 'nbextension') {
                    require_url = decodeURIComponent(keyValuePair[1]);
                    break;
                }
            }
        }
        else if (evt.state === null) {
            return; // as a result of setting window.location.hash
        }
        else {
            require_url = evt.state;
        }
        var selected_link;
        if (extensions_dict[require_url] === undefined || extensions_dict[require_url].selector_link.hasClass('disabled')) {
            selected_link = $('.nbext-selector').find('li:not(.disabled)').last().children('a');
        }
        else {
            selected_link = extensions_dict[require_url].selector_link;
        }
        selected_link.click();
    }