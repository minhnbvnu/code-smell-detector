function runQuery(statement, escaped, compiled, debug) {
        var share = window.location.protocol + '//' + window.location.host + window.location.pathname + '?s=' + encodeURIComponent(statement);
        history.pushState(null, null, share);
        $('#copy-uri').unbind(); // unbind any previous registered handler.
        $('#copy-uri').click(function() {
            window.prompt('Copy the URI below',
                window.location.protocol + '//' + window.location.host + '/q?s=' + escaped);
        });
        $('#results').show();
        $('#results').animate({
            opacity: 0.25
        });

        if(wsEnabled) {
            try {
                doWs(statement, escaped, compiled, debug);
            }
            catch(e) {
                doXhr(statement, escaped, compiled);
            }
        }
        else {
            doXhr(statement, escaped, compiled);
        }
    }