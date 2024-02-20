function get_regl(gl) {
        if (regl_wrapper == null)
            regl_wrapper = new ReglWrapper(gl);
        return regl_wrapper;
    }