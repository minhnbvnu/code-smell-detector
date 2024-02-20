function had_error(err) {
            debug('Request error', err);
            out.emit('err', err);
            done(err || new Error('Unknown error when making request.'));
        }