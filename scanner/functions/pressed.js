function pressed(ctrl) {
    const element = document.getElementById(ctrl + 'Button');
    console.assert(element, ctrl + 'Button element does not exist');
    return element.checked;
}