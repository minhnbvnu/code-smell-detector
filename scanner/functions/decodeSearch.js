function decodeSearch(search) {
        var data = [];

        if (search && search.indexOf('?') > -1) {
            search = search.replace(/\+/g, ' ').split('?')[1];

            if (search && search.indexOf('#') > -1) {
                search = search.split('#')[0];
            }

            if (search) {
                // search = search.toLowerCase();
                data = $.map(search.split('&'), function(n) {
                    var param = [];
                    var value;

                    n = n.split('=');
                    value = n[1];
                    param.push(n[0]);

                    if (value) {
                        value = $.trim(value);

                        if (value) {
                            param.push(value);
                        }
                    }

                    return param.join('=');
                });
            }
        }

        return data;
    }