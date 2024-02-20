function conflictDetection() {
    var report$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var nodesTested = {
      conflict: {},
      noConflict: {}
    };

    WINDOW.onmessage = function (e) {
      if (WINDOW.location.origin === 'file://' || e.origin === WINDOW.location.origin) {
        if (e && e.data) {
          if (e.data.type === 'fontawesome-conflict') {
            nodesTested.conflict[e.data.md5] = e.data;
          } else if (e.data.type === 'no-conflict') {
            nodesTested.noConflict[e.data.md5] = e.data;
          }
        }
      }
    };

    var scriptsToTest = detectSvgConflicts(DOCUMENT.currentScript);
    var cssToTest = detectWebfontConflicts();

    var nodesFound = _objectSpread({}, scriptsToTest, cssToTest);

    var testCount = Object.keys(scriptsToTest).length + Object.keys(cssToTest).length; // The resultsCollectionMaxWait allows for the time between when the tests running under
    // child iframes call postMessage with their results, and when the parent window
    // receives and handles those events with window.onmessage.
    // Making it configurable allows us to test the scenario where this timeout is exceeded.
    // Naming it something very different from "timeout" is to help avoid the potential ambiguity between
    // these two timeout-related settings.

    var masterTimeout = WINDOW.FontAwesomeDetection.timeout + WINDOW.FontAwesomeDetection.resultsCollectionMaxWait;
    console.group('Font Awesome Detector');

    if (testCount === 0) {
      console.info('%cAll Good!', 'color: green; font-size: large');
      console.info('We didn\'t find anything that needs testing for conflicts. Ergo, no conflicts.');
    } else {
      console.info("Testing ".concat(testCount, " possible conflicts."));
      console.info("We'll wait about ".concat(Math.round(WINDOW.FontAwesomeDetection.timeout / 10) / 100, " seconds while testing these and\n") + "then up to another ".concat(Math.round(WINDOW.FontAwesomeDetection.resultsCollectionMaxWait / 10) / 100, " to allow the browser time\n") + "to accumulate the results. But we'll probably be outta here way before then.\n\n");
      console.info("You can adjust those durations by assigning values to these attributes on the <script> element that loads this detection:");
      console.info("\t%c".concat(timeoutAttr, "%c: milliseconds to wait for each test before deciding whether it's a conflict."), 'font-weight: bold;', 'font-size: normal;');
      console.info("\t%c".concat(resultsCollectionMaxWaitAttr, "%c: milliseconds to wait for the browser to accumulate test results before giving up."), 'font-weight: bold;', 'font-size: normal;');
      pollUntil({
        // Give this overall timer a little extra cushion
        maxDuration: masterTimeout,
        showProgress: true,
        progressIndicator: 'waiting...',
        fn: function fn() {
          return Object.keys(nodesTested.conflict).length + Object.keys(nodesTested.noConflict).length >= testCount;
        }
      }).then(function () {
        console.info('DONE!');
        setDoneResults({
          nodesTested: nodesTested,
          nodesFound: nodesFound
        });
        report$$1({
          nodesTested: nodesTested,
          nodesFound: nodesFound
        });
        console.groupEnd();
      }).catch(function (e) {
        if (e === 'timeout') {
          console.info('TIME OUT! We waited until we got tired. Here\'s what we found:');
          setDoneResults({
            nodesTested: nodesTested,
            nodesFound: nodesFound
          });
          report$$1({
            nodesTested: nodesTested,
            nodesFound: nodesFound
          });
        } else {
          console.info('Whoops! We hit an error:', e);
          console.info('Here\'s what we\'d found up until that error:');
          setDoneResults({
            nodesTested: nodesTested,
            nodesFound: nodesFound
          });
          report$$1({
            nodesTested: nodesTested,
            nodesFound: nodesFound
          });
        }

        console.groupEnd();
      });
    }
  }