function getWindowForElement(element) {
            var doc = element.ownerDocument || element;
            return (doc.defaultView || doc.parentWindow || window);
        }