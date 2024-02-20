function stateExistingPaste() {
    $('button#sendbutton').hide();

    // No "clone" for IE<10.
    if ($('div#oldienotice').is(":visible")) {
        $('button#clonebutton').hide();
    }
    else {
        $('button#clonebutton').show();
    }
    $('button#rawtextbutton').show();

    $('div#expiration').hide();
    $('div#burnafterreadingoption').hide();
    $('div#opendisc').hide();
    $('div#syntaxcoloringoption').hide();    
    $('button#newbutton').show();
    $('div#pasteresult').hide();
    $('textarea#message').hide();
    $('div#cleartext').show();
}