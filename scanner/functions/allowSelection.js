function allowSelection(el) {
    el.removeClass('fc-unselectable')
        .off('selectstart', preventDefault);
}