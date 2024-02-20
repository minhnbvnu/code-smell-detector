function createdb_for_multiple_tests(dbname, version) {
    var rq_open,
        fake_open = {},
        test = null,
        dbname = (dbname || getDBNameRandom());

    if (version)
        rq_open = indexedDB.open(dbname, version);
    else
        rq_open = indexedDB.open(dbname);

    let done;
    function auto_fail(evt) {
        /* Fail handlers, if we haven't set on/whatever/, don't
         * expect to get event whatever. */
        rq_open['on' + evt] = function () { done(new Error('Unexpected ' + evt + ' event')) };
    }

    // add a .setTest method to the DB object
    Object.defineProperty(rq_open, 'setDone', {
        enumerable: false,
        value (d) {
            done = d;

            auto_fail("upgradeneeded");
            auto_fail("success");
            auto_fail("blocked");
            auto_fail("error");

            return this;
        }
    });

    return rq_open;
}