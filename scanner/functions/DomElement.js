function DomElement(selector) {
    if (!selector) {
        return;
    }

    // selector 本来就是 DomElement 对象，直接返回
    if (selector instanceof DomElement) {
        return selector;
    }

    this.selector = selector;
    var nodeType = selector.nodeType;

    // 根据 selector 得出的结果（如 DOM，DOM List）
    var selectorResult = [];
    if (nodeType === 9) {
        // document 节点
        selectorResult = [selector];
    } else if (nodeType === 1) {
        // 单个 DOM 节点
        selectorResult = [selector];
    } else if (isDOMList(selector) || selector instanceof Array) {
        // DOM List 或者数组
        selectorResult = selector;
    } else if (typeof selector === 'string') {
        // 字符串
        selector = selector.replace('/\n/mg', '').trim();
        if (selector.indexOf('<') === 0) {
            // 如 <div>
            selectorResult = createElemByHTML(selector);
        } else {
            // 如 #id .class
            selectorResult = querySelectorAll(selector);
        }
    }

    var length = selectorResult.length;
    if (!length) {
        // 空数组
        return this;
    }

    // 加入 DOM 节点
    var i = void 0;
    for (i = 0; i < length; i++) {
        this[i] = selectorResult[i];
    }
    this.length = length;
}