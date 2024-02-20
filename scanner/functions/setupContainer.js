function setupContainer(element, getValue) {
    if (element.type != 'textarea') {
        throw new Error("Textarea required!");
    }

    var parentNode = element.parentNode;
    var container = document.createElement('div');
    var resizeEvent = function() {
        var style = 'position:relative;';
        [
            'margin-top', 'margin-left', 'margin-right', 'margin-bottom'
        ].forEach(function(item) {
            style += item + ':' +
                        getCSSProperty(element, container, item) + ';';
        });
        var width = getCSSProperty(element, container, 'width') || (element.clientWidth + "px");
        var height = getCSSProperty(element, container, 'height')  || (element.clientHeight + "px");
        style += 'height:' + height + ';width:' + width + ';';
        style += 'display:inline-block;';
        container.setAttribute('style', style);
    };
    event.addListener(window, 'resize', resizeEvent);
    resizeEvent();
    parentNode.insertBefore(container, element.nextSibling);
    while (parentNode !== document) {
        if (parentNode.tagName.toUpperCase() === 'FORM') {
            var oldSumit = parentNode.onsubmit;
            parentNode.onsubmit = function(evt) {
                element.value = getValue();
                if (oldSumit) {
                    oldSumit.call(this, evt);
                }
            };
            break;
        }
        parentNode = parentNode.parentNode;
    }
    return container;
}