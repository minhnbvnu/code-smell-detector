function flashGeo() {
        if (count === 0) {
            if (initVisible) {
                me.show();
            } else {
                me.hide();
            }
            if (cb) {
                if (context) {
                    cb.call(context);
                } else {
                    cb();
                }
            }
            return;
        }

        if (count % 2 === 0) {
            me.hide();
        } else {
            me.show();
        }
        count--;
        me._flashTimeout = setTimeout(flashGeo, interval);
    }