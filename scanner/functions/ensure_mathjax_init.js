function ensure_mathjax_init() {
        if(!mathjax_init_done) {
            mathjax_init_done = true;
            mathjaxutils.init();
        }
    }