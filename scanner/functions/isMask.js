function isMask(pos) {
                var testPos = determineTestPosition(pos);
                var test = tests[testPos];

                return test != undefined ? test.fn : false;
            }