function findElementByData(node, name) {
        var attributeName = 'data-' + name;
        var dummy = document.createElement("div");
        dummy.appendChild(node);
        var element = dummy.querySelector('[' + attributeName + ']');
        if(!element) {
            throw new Error('Unable to find: "' + attributeName + '" attribute.');
        }
        return element;
    }