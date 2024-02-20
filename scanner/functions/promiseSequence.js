function promiseSequence(inputs, promiseMaker) {
    // Make a private copy of the array that we can modify
    inputs = [...inputs];

    // Here's the function that we'll use as a Promise callback
    // This is the pseudorecursive magic that makes this all work.
    function handleNextInput(outputs) {
        if (inputs.length === 0) {
            // If there are no more inputs left, then return the array
            // of outputs, finally fulfilling this Promise and all the
            // previous resolved-but-not-fulfilled Promises.
            return outputs;
        } else {
            // If there are still input values to process, then we'll
            // return a Promise object, resolving the current Promise
            // with the future value from a new Promise.
            let nextInput = inputs.shift(); // Get the next input value,
            return promiseMaker(nextInput)  // compute the next output value,
                // Then create a new outputs array with the new output value
                .then(output => outputs.concat(output))
                // Then "recurse", passing the new, longer, outputs array
                .then(handleNextInput);
        }
    }

    // Start with a Promise that fulfills to an empty array and use
    // the function above as its callback.
    return Promise.resolve([]).then(handleNextInput);
}