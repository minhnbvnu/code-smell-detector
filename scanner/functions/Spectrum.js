function Spectrum(entry, snap, singleStep) {
                this.xPct = [];
                this.xVal = [];
                this.xSteps = [];
                this.xNumSteps = [];
                this.xHighestCompleteStep = [];
                this.xSteps = [singleStep || false];
                this.xNumSteps = [false];
                this.snap = snap;
                var index;
                var ordered = [];
                // Map the object keys to an array.
                Object.keys(entry).forEach(function (index) {
                    ordered.push([asArray(entry[index]), index]);
                });
                // Sort all entries by value (numeric sort).
                ordered.sort(function (a, b) {
                    return a[0][0] - b[0][0];
                });
                // Convert all entries to subranges.
                for (index = 0; index < ordered.length; index++) {
                    this.handleEntryPoint(ordered[index][1], ordered[index][0]);
                }
                // Store the actual step values.
                // xSteps is sorted in the same order as xPct and xVal.
                this.xNumSteps = this.xSteps.slice(0);
                // Convert all numeric steps to the percentage of the subrange they represent.
                for (index = 0; index < this.xNumSteps.length; index++) {
                    this.handleStepPoint(index, this.xNumSteps[index]);
                }
            }