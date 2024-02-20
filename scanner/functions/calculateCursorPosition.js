function calculateCursorPosition(position, element) {
    return position - element.getBoundingClientRect().left - DRAGGABLE_HANDLE_WIDTH;
}