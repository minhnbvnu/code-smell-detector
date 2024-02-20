function upset(arr) {
    let j, _item;
    for (let i = 0; i < arr.length; i++) {
        j = Math.floor(Math.random() * i);
        _item = arr[i];
        arr[i] = arr[j];
        arr[j] = _item;
    }
    return arr;
}