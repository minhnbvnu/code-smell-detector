function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }