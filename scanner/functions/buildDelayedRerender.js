function buildDelayedRerender(wait) {
        var func = this.tryRerender.bind(this);
        if (wait != null) {
            func = debounce(func, wait);
        }
        return func;
    }