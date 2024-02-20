function replacePlaceHolder(placeholder, element)
{
    placeholder.each(function (index, item)
    {
        // todo: check how append is implemented. Perhaps cloning here is superfluous.
        $(item).before(element.clone(true)).remove();
    });
}