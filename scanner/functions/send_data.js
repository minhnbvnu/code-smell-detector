function send_data() {
    // Do not send if no data.
    if ($('textarea#message').val().length == 0) {
        return;
    }

    // If sjcl has not collected enough entropy yet, display a message.
    if (!sjcl.random.isReady())
    {
        showStatus('Sending paste (Please move your mouse for more entropy)...', spin=true);
        sjcl.random.addEventListener('seeded', function(){ send_data(); }); 
        return; 
    }
    
    showStatus('Sending paste...', spin=true);

    var randomkey = sjcl.codec.base64.fromBits(sjcl.random.randomWords(8, 0), 0);
    var cipherdata = zeroCipher(randomkey, $('textarea#message').val());
    var data_to_send = { data:           cipherdata,
                         expire:         $('select#pasteExpiration').val(),
                         burnafterreading: $('input#burnafterreading').is(':checked') ? 1 : 0,
                         opendiscussion: $('input#opendiscussion').is(':checked') ? 1 : 0,
                         syntaxcoloring: $('input#syntaxcoloring').is(':checked') ? 1 : 0
                       };
    $.post(scriptLocation(), data_to_send, 'json')
        .error(function() {
            showError('Data could not be sent (serveur error or not responding).');
        })
        .success(function(data) {
            if (data.status == 0) {
                stateExistingPaste();
                var url = scriptLocation() + "?" + data.id + '#' + randomkey;
                var deleteUrl = scriptLocation() + "?pasteid=" + data.id + '&deletetoken=' + data.deletetoken;
                showStatus('');

                $('div#pastelink').html('Your paste is <a id="pasteurl" href="' + url + '">' + url + '</a> <span id="copyhint">(Hit CTRL+C to copy)</span>');
                $('div#deletelink').html('<a href="' + deleteUrl + '">Delete link</a>');
                $('div#pasteresult').show();
                selectText('pasteurl'); // We pre-select the link so that the user only has to CTRL+C the link.

                setElementText($('div#cleartext'), $('textarea#message').val());
                urls2links($('div#cleartext'));

                // FIXME: Add option to remove syntax highlighting ?
                if ($('input#syntaxcoloring').is(':checked')) applySyntaxColoring();

                showStatus('');
            }
            else if (data.status==1) {
                showError('Could not create paste: '+data.message);
            }
            else {
                showError('Could not create paste.');
            }
        });
}