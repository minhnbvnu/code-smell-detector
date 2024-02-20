function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }