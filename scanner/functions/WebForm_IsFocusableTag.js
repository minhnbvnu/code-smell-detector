function WebForm_IsFocusableTag(tagName) {
    return (tagName == "input" ||
            tagName == "textarea" ||
            tagName == "select" ||
            tagName == "button" ||
            tagName == "a");
}