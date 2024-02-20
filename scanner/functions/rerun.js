function rerun() {
        try {
            if (window.sessionStorage) {
                // store this for the session and go 'round to another page to force uncaching on Chrome
                sessionStorage.JSBNG_harnessState = JSON.stringify({
                    results: results,
                    curRun: curRun,
                    curBenchmark: curBenchmark,
                    curMode: curMode
                });
                window.location.href = window.location.href.replace(/\/[^\/]*$/, "/reload.html");
                return;
            }
        } catch (ex) {}
        runBenchmark();
    }