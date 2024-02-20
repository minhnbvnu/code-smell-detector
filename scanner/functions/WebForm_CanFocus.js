function WebForm_CanFocus(element) {
    if (!element || !(element.tagName)) return false;
    var tagName = element.tagName.toLowerCase();
    return (!(element.disabled) &&
            (!(element.type) || element.type.toLowerCase() != "hidden") &&
            WebForm_IsFocusableTag(tagName) &&
            WebForm_IsInVisibleContainer(element)
            );
}