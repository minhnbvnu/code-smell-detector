function registerHarTests(suiteInfo) {
        function _createTest(keyTestData, testData, keyTotals, assertFunction) {
            // E.g. 'Timings'
            var type = keyTotals.substring(0, 1).toUpperCase() + keyTotals.substring(1);

            // E.g. 'calcTimingsTotalsForPages'
            var methodName = "calc" + type + "TotalsForPages";

            // E.g. 'issue61_calcTimingsTotalsForPages'
            var testName = methodName + " " + keyTestData;

            // E.g. create a test to compare the timings for a particular har.
            suiteInfo[testName] = createTest(testName, methodName, testData.har, testData.page, testData[keyTotals], assertFunction);
        }

        // Iterate over the expectations and create tests to compare each expected
        // object to the actual object.
        for (var keyTestData in expectationsForHarFiles) {
            var testData = expectationsForHarFiles[keyTestData];
            _createTest(keyTestData, testData, "timings", timingsCloseTo);
            _createTest(keyTestData, testData, "content", deepEqual);
            _createTest(keyTestData, testData, "traffic", deepEqual);
            _createTest(keyTestData, testData, "cache", deepEqual);
        }
    }