function addToTester(func) {
            tester[func] = function isaTester() {
                this._testers.push(isa[func]);
            };
        }