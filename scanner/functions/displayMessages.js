function displayMessages(key, comments) {
    try { // Try to decrypt the paste.
        var cleartext = zeroDecipher(key, comments[0].data);
    } catch(err) {
        $('div#cleartext').hide();
        $('button#clonebutton').hide();
        showError('Could not decrypt data (Wrong key ?)');
        return;
    }
    setElementText($('div#cleartext'), cleartext);
    urls2links($('div#cleartext')); // Convert URLs to clickable links.

    // comments[0] is the paste itself.

    if (comments[0].meta.syntaxcoloring) applySyntaxColoring();

    // Display paste expiration.
    if (comments[0].meta.expire_date) $('div#remainingtime').removeClass('foryoureyesonly').text('This document will expire in '+secondsToHuman(comments[0].meta.remaining_time)+'.').show();
    if (comments[0].meta.burnafterreading) {
        $('div#remainingtime').addClass('foryoureyesonly').text('FOR YOUR EYES ONLY.  Don\'t close this window, this message can\'t be displayed again.').show();
        $('button#clonebutton').hide(); // Discourage cloning (as it can't really be prevented).
    }

    // If the discussion is opened on this paste, display it.
    if (comments[0].meta.opendiscussion) {
        $('div#comments').html('');
        // For each comment.
        for (var i = 1; i < comments.length; i++) {
            var comment=comments[i];
            var cleartext="[Could not decrypt comment ; Wrong key ?]";
            try {
                cleartext = zeroDecipher(key, comment.data);
            } catch(err) { }
            var place = $('div#comments');
            // If parent comment exists, display below (CSS will automatically shift it right.)
            var cname = 'div#comment_'+comment.meta.parentid

            // If the element exists in page
            if ($(cname).length) {
                place = $(cname);
            }
            var divComment = $('<div class="comment" id="comment_' + comment.meta.commentid+'">'
                               + '<div class="commentmeta"><span class="nickname"></span><span class="commentdate"></span></div><div class="commentdata"></div>'
                               + '<button onclick="open_reply($(this),\'' + comment.meta.commentid + '\');return false;">Reply</button>'
                               + '</div>');
            setElementText(divComment.find('div.commentdata'), cleartext);
            // Convert URLs to clickable links in comment.
            urls2links(divComment.find('div.commentdata'));
            divComment.find('span.nickname').html('<i>(Anonymous)</i>');

            // Try to get optional nickname:
            try {
                divComment.find('span.nickname').text(zeroDecipher(key, comment.meta.nickname));
            } catch(err) { }
            divComment.find('span.commentdate').text('  ('+(new Date(comment.meta.postdate*1000).toString())+')').attr('title','CommentID: ' + comment.meta.commentid);

            // If an avatar is available, display it.
            if (comment.meta.vizhash) {
                divComment.find('span.nickname').before('<img src="' + comment.meta.vizhash + '" class="vizhash" title="Anonymous avatar (Vizhash of the IP address)" />');
            }

            place.append(divComment);
        }
        $('div#comments').append('<div class="comment"><button onclick="open_reply($(this),\'' + pasteID() + '\');return false;">Add comment</button></div>');
        $('div#discussion').show();
    }
}