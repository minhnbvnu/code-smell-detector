function isInlineBlock(container) {
    return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
}