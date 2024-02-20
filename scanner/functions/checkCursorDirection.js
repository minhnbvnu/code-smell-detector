function checkCursorDirection(statement, direction) {
            numTried += 1;
            request = eval(statement);
            request.onsuccess = function(event) {
                assert(event.target.result !== null, "Check the result is not null")
                assert.equal(event.target.result.direction, direction, "Check the result direction");
                numDone += 1;
                if (numDone >= numTried) {
                    done();
                }
            };
        }