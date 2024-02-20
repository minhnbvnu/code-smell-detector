function setCurrentNumber (tx, store, num, successCb, failCb) {
    num = num === MAX_ALLOWED_CURRENT_NUMBER
        ? num + 2 // Since incrementing by one will have no effect in JavaScript on this unsafe max, we represent the max as a number incremented by two. The getting of the current number is never returned to the user and is only used in safe comparisons, so it is safe for us to represent it in this manner
        : num + 1;
    return assignCurrentNumber(tx, store, num, successCb, failCb);
}