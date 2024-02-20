function runPendingSaveCallbacksImmediately() {
    // Work with a clone of the array because calling these functions
    // removes them from pendingSaveCallbacks.
    const copy = pendingSaveCallbacks.slice();
    for (let i = 0; i < copy.length; ++i) { copy[i](); }

    console.assert(pendingSaveCallbacks.length === 0);
}