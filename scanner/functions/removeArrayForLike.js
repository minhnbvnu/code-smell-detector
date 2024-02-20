function removeArrayForLike(arr, val) {
    return arr.filter(item => item.indexOf(val) === -1);
}