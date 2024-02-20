function traverseInOrder(tree, key, comparator) {
    VALUE.key = key;
    var ret = [];
    var i = 0, current = tree.__root, v;
    while (true) {
        if (current) {
            current = (STACK[i++] = current).left;
        } else {
            if (i > 0) {
                v = (current = STACK[--i]).data;
                if (comparator(v, VALUE)) {
                    pPush.apply(ret, v.value.tuples);
                    current = current.right;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
    STACK.length = 0;
    return ret;
}