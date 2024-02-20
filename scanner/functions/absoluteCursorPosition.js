function absoluteCursorPosition(e)
{
    if (isNaN(window.scrollX))
    {
        return new Position(e.clientX + document.documentElement.scrollLeft
            + document.body.scrollLeft, e.clientY + document.documentElement.scrollTop
            + document.body.scrollTop);
    }

    return new Position(e.clientX + window.scrollX, e.clientY + window.scrollY);
}