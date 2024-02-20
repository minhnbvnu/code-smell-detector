function delegate(criteria, listener) {
    return function (e) {
        var el = e.target;
        do {
            if (!criteria(el)) {
                continue;
            }
            e.delegateTarget = el;
            listener.call(this, e);
            return;
        } while ((el = el.parentNode));
    };
}