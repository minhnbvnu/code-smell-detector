function getAnchorUrls(selector, includeOffsite) {
        return $(selector).map(function() {
            var href = $(this).attr('href');
            return (href && href.indexOf('#') !== 0 && (includeOffsite || isLocalUrl(href))) ? 
                toFullUrl(href) : undefined;
        }).toArray();
    }