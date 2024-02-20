function arrayExists(array, x) {
  /* BEGIN LOOP */
    for (var i = 0; i < array.length; i++) {
        if (array[i] == x) return true;
    }
  /* END LOOP */
    return false;
}