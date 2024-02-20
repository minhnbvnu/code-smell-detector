function encodeSearch(data, detached) {
        var search = location.search;
        var per_page = location.search.match(/per_page=\d+/);
        var params;

        search = search.replace(/per_page=\d+/g,'').replace(/page=\d+/,'page=1');


        if(per_page && per_page.length){
            search = search + "&" + per_page[0];
        }


        if ($.isArray(data)) {
            params = decodeSearch(search);

            $.each(data, function(i, param) {
                i = $.inArray(param, params);

                if (i === -1) {
                    params.push(param);
                } else if (detached) {
                    params.splice(i, 1);
                }
            });

            search = '?' + params.join('&');
        }

        return search;
    }