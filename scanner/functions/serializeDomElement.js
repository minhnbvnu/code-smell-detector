function serializeDomElement(element) {
        let elementData = null;
        if (element) {
            elementData = defaultElementTransform(element);
            if (element.tagName in elementTransforms) {
                elementTransforms[element.tagName].forEach((trans) => Object.assign(elementData, trans(element)));
            }
        }
        return elementData;
    }