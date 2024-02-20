function counter(err) {
            if (err) {
                done(err);
            } else {
                count--;
                if (!count) {
                    done();
                }
            }
        }