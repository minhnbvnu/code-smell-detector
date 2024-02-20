function getArrayIndexOfSubstring(array, searchTarget) {
    var isFound = false;
    var counter = 0;
    var returnValue = -1;

    while(isFound === false && counter < array.length) {
        if(array[counter].indexOf(searchTarget) !== -1) {
            isFound = true;
            returnValue = counter;
        }

        counter++;
    }

    return returnValue;
}