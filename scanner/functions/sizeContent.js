function sizeContent() {
    var newHeight = $("html").height() - 500 + "px";
    $(".treeDiv").css("min-height", newHeight);
    $(".treeDiv").css("height", newHeight);
}