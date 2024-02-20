function preventSelection(el) {
    el.addClass('fc-unselectable')
        .on('selectstart', preventDefault);
}