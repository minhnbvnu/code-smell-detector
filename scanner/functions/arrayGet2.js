function arrayGet2(offset, outputArray, outputIndex) {
    outputArray[outputIndex] = this.array[offset];
    outputArray[outputIndex + 1] = this.array[offset + 1];
}