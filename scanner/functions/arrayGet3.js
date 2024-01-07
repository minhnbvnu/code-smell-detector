function arrayGet3(offset, outputArray, outputIndex) {
    outputArray[outputIndex] = this.array[offset];
    outputArray[outputIndex + 1] = this.array[offset + 1];
    outputArray[outputIndex + 2] = this.array[offset + 2];
}