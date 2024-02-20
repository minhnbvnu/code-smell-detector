function send_comment(parentid) {
    // Do not send if no data.
    if ($('textarea#replymessage').val().length==0) {
        return;
    }

    showStatus('Sending comment...', spin=true);
    var cipherdata = zeroCipher(pageKey(), $('textarea#replymessage').val());
    var ciphernickname = '';
    var nick=$('input#nickname').val();
    if (nick != '' && nick != 'Optional nickname...') {
        ciphernickname = zeroCipher(pageKey(), nick);
    }
    var data_to_send = { data:cipherdata,
                         parentid: parentid,
                         pasteid:  pasteID(),
                         nickname: ciphernickname
                       };

    $.post(scriptLocation(), data_to_send, 'json')
        .error(function() {
            showError('Comment could not be sent (serveur error or not responding).');
        })
        .success(function(data) {
            if (data.status == 0) {
                showStatus('Comment posted.');
                location.reload();
            }
            else if (data.status==1) {
                showError('Could not post comment: '+data.message);
            }
            else {
                showError('Could not post comment.');
            }
        });
    }