function anyInputActive()
{
    let ele = document.activeElement;

    if (!ele)
        return false;

    let tagName = ele.tagName;

    return (
        tagName === 'INPUT' ||
        tagName === 'SELECT' ||
        tagName === 'TEXTAREA'
    );
}