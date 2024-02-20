function auto_fail(evt) {
        /* Fail handlers, if we haven't set on/whatever/, don't
         * expect to get event whatever. */
        rq_open['on' + evt] = function () { done(new Error('Unexpected ' + evt + ' event')) };
    }