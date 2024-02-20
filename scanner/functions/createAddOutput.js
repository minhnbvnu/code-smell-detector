function createAddOutput() {
            let outputs;
            return { addOutput, getOutputs };
            function addOutput(path) {
                if (path) {
                    (outputs || (outputs = [])).push(path);
                }
            }
            function getOutputs() {
                return outputs || emptyArray;
            }
        }