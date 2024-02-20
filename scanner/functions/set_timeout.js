function set_timeout(type, milisecs) {
            if (timer)
                clearTimeout(timer);
            if (milisecs <= 0)
                return;
            timer = setTimeout(function () {
                out.emit('timeout', type);
                request.abort();
                // also invoke done() to terminate job on read_timeout
                if (type == 'read')
                    done(new Error(type + ' timeout'));
            }, milisecs);
        }