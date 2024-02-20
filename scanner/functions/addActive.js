function addActive(htmlElements, index) {
    if (!htmlElements) { return index; }

    removeAllActives(htmlElements);
    if (index >= htmlElements.length) {
        index = 0;
    } else if (index < 0) {
        index = (htmlElements.length - 1);
    }

    htmlElements[index]?.classList.add('active');

    return index;
}