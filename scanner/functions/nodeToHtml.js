function nodeToHtml(node, arr, formatter, current) {
        switch (node.type) {
            case 'root':
                for (var i = 0, ci; ci = node.children[i++];) {
                    //插入新行
                    if (formatter && ci.type == 'element' && !dtd.$inlineWithA[ci.tagName] && i > 1) {
                        insertLine(arr, current, true);
                        insertIndent(arr, current)
                    }
                    nodeToHtml(ci, arr, formatter, current)
                }
                break;
            case 'text':
                isText(node, arr);
                break;
            case 'element':
                isElement(node, arr, formatter, current);
                break;
            case 'comment':
                isComment(node, arr, formatter);
        }
        return arr;
    }