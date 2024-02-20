function removeAllActives(htmlElements) {
    for (let i = 0; i < htmlElements.length; i++) {
        htmlElements[i].classList.remove('active');
    }
}