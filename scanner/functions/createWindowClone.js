function createWindowClone(ownerDocument, containerDocument, width, height, options, x ,y) {
    labelCanvasElements(ownerDocument);
    var documentElement = isIE9() ? cloneNodeIE9(ownerDocument.documentElement, options.javascriptEnabled) : ownerDocument.documentElement.cloneNode(true);
    var container = containerDocument.createElement("iframe");

    container.className = "html2canvas-container";
    container.style.visibility = "hidden";
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0px";
    container.style.border = "0";
    container.width = width;
    container.height = height;
    container.scrolling = "no"; // ios won't scroll without it
    containerDocument.body.appendChild(container);

    return new Promise(function(resolve) {
        var documentClone = container.contentWindow.document;

        cloneNodeValues(ownerDocument.documentElement, documentElement, "textarea");
        cloneNodeValues(ownerDocument.documentElement, documentElement, "select");

        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
         if window url is about:blank, we can assign the url to current by writing onto the document
         */
        container.contentWindow.onload = container.onload = function() {
            var interval = setInterval(function() {
                if (documentClone.body.childNodes.length > 0) {
                    cloneCanvasContents(ownerDocument, documentClone);
                    clearInterval(interval);
                    if (options.type === "view") {
                        container.contentWindow.scrollTo(x, y);
                    }
                    resolve(container);
                }
            }, 50);
        };

        documentClone.open();
        documentClone.write("<!DOCTYPE html><html></html>");
        // Chrome scrolls the parent document for some reason after the write to the cloned window???
        restoreOwnerScroll(ownerDocument, x, y);
        documentClone.replaceChild(options.javascriptEnabled === true ? documentClone.adoptNode(documentElement) : removeScriptNodes(documentClone.adoptNode(documentElement)), documentClone.documentElement);
        documentClone.close();
    });
}