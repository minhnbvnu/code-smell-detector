function onExpanderClick(event) {
    event.stopPropagation();
    event.target.parentElement.classList.toggle('closed');
}