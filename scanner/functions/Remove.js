function Remove(inputArray, objectToRemove) {
  return inputArray.filter((el) => {
    return el.hash !== objectToRemove.hash ||
           el.ptr  !== objectToRemove.ptr;
  });
}