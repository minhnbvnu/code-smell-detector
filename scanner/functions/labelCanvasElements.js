function labelCanvasElements(ownerDocument) {
    [].slice.call(ownerDocument.querySelectorAll("canvas"), 0).forEach(function(canvas) {
        canvas.setAttribute(html2canvasCanvasCloneAttribute, "canvas-" + html2canvasCanvasCloneIndex++);
    });
}