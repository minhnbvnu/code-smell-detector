function unionRecency(arr, arr1, arr2) {
    pPush.apply(arr, arr1);
    var i = -1, l = arr2.length, val, j = arr.length;
    while (++i < l) {
        val = arr2[i];
        if (indexOf(arr, val) === -1) {
            arr[j++] = val;
        }
    }
}