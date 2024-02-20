function get_html (url, callback) {
        var xhr = create_xhr();
        if (xhr !== null) {
            xhr.open ('GET', url, true);
            xhr.onerror = function () {
                dbg_error ('HTML request error');
            };
            xhr.onload = function () {callback (xhr.responseText);};
            xhr.send (null);
        }
    }