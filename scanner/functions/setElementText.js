function setElementText(element, text) {
    // For IE<10.
    if ($('div#oldienotice').is(":visible")) {
        // IE<10 does not support white-space:pre-wrap; so we have to do this BIG UGLY STINKING THING.
        var html = htmlEntities(text).replace(/\n/ig,"\r\n<br>");
        element.html('<pre>'+html+'</pre>');
    }
    // for other (sane) browsers:
    else {
        element.text(text);
    }
}