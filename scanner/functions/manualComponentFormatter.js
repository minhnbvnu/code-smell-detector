function manualComponentFormatter(component) {
    if (component.cgIgnore || component.CgIgnore || component.CGIgnore) {
        return null;
    }
    component.markdownIgnore = undefined;
    component.MarkdownIgnore = undefined;
    return component;       
}