function collectHttpQueryParams(req, holder, ignoreS) {
        // Collect req params (with sanitization)
        _.each(req.query, function(v, k) {
            if (ignoreS && k == 's') {
                return;
            }
            if (_.isArray(v)) {
                holder.params[k] = [];
                _.each(v, function(val) {
                    holder.params[k].push(sanitize(val).str);
                });
            }
            else {
                holder.params[k] = sanitize(v).str;
            }
        });
    }