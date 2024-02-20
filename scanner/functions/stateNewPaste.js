function stateNewPaste() {
    $('button#sendbutton').show();
    $('button#clonebutton').hide();
    $('button#rawtextbutton').hide();
    $('div#expiration').show();
    $('div#remainingtime').hide();
    $('div#burnafterreadingoption').show();
    $('div#opendisc').show();
    $('div#syntaxcoloringoption').show();
    $('button#newbutton').show();
    $('div#pasteresult').hide();
    $('textarea#message').text('');
    $('textarea#message').show();
    $('div#cleartext').hide();
    $('div#message').focus();
    $('div#discussion').hide();
}