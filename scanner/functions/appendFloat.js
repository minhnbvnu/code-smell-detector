function appendFloat(object, html)
    {
        html.push('<span class="objectBox-number">', escapeHTML(objectToString(object)), '</span>');
    }