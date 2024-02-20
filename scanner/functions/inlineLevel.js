function inlineLevel(container) {
    return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
}