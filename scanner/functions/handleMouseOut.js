function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isDown != false) {
        handleMouseUp(e);
    }
}