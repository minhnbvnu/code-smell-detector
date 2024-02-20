function eraseSuggestionList(form) {
    while (form.children.length > 1) {
        form.removeChild(form.lastChild);
    }
}