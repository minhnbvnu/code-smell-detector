function inflateDict(array, $, dict) {
    const dictArray = []
    for (let index = 0; index < array.length; index++) {
        const li = $(array[index]);
        const a = li.children('a');
        if (!a) continue;
        const key = getKey(a);
        if (!dict[key]) { continue; }
        dict[key].title = a.text();
        dict[key].isLast = array.length == 1 || index == array.length - 1;
        const childs = $(array[index]).children('ol').children('li');
        if (childs != null && childs.length > 0) {
            dict[key].child = inflateDict(childs, $, dict)
        }
        dictArray.push(dict[key])
    }
    return dictArray;
}