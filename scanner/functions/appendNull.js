function appendNull(object, html)
    {
        html.push('<span class="objectBox-null">', escapeHTML(objectToString(object)), '</span>');
    }