function appendObjectFormatted(object, html)
    {
        var text = objectToString(object);
        var reObject = /\[object (.*?)\]/;

        var m = reObject.exec(text);
        html.push('<span class="objectBox-object">', m ? m[1] : text, '</span>')
    }