function conf_dot_delete_keys(conf, dotted_keys) {
        return conf.load().then(function (data) {
            for (var ii = 0; ii < dotted_keys.length; ii++) {
                var obj = data;
                var key_parts = dotted_keys[ii].split('.');
                while (key_parts.length > 0) {
                    var partkey = key_parts.shift();
                    if (key_parts.length === 0) {
                        delete obj[partkey];
                        break;
                    }
                    if (!obj.hasOwnProperty(partkey)) {
                        break;
                    }
                    obj = obj[partkey];
                }
            }
            // Modify the config values stored by calling api directly
            // (set endpoint isn't yet implemented in js class)
            return utils.promising_ajax(conf.api_url(), {
                processData: false,
                type : "PUT",
                data: JSON.stringify(data),
                dataType : "json",
                contentType: 'application/json',
            });
        });
    }