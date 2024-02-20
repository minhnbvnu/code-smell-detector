function longestWord(str, splitType = /\s+/g) {
    let _max = 0, _item = '';
    let strArr = str.split(splitType);
    strArr.forEach(item => {
        if (_max < item.length) {
            _max = item.length;
            _item = item;
        }
    });
    return {el: _item, max: _max};
}