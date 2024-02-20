function collectHttpHeaders(req, holder) {
        // Collect req headers (with sanitization)
        _.each(req.headers, function(v, k) {
            if (skipHeaders.indexOf(k) === -1) {
                if (_.isArray(v)) {
                    holder.headers[k] = [];
                    _.each(v, function(val) {
                        holder.headers[k].push(sanitize(val).str);
                    });
                }
                else {
                    holder.headers[k] = sanitize(v).str;
                }
            }
        });
    }