function arrayGet4(offset, outputArray, outputIndex) {
    outputArray[outputIndex] = this.array[offset];
    outputArray[outputIndex + 1] = this.array[offset + 1];
    outputArray[outputIndex + 2] = this.array[offset + 2];
    outputArray[outputIndex + 3] = this.array[offset + 3];
}