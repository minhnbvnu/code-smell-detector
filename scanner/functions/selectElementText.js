function selectElementText(textNode, startOffset, endOffset)
{
    var win = window;
    var doc = win.document;
    var range;
    if (win.getSelection && doc.createRange)
    {
        var sel = win.getSelection();
        range = doc.createRange();
        //range.selectNodeContents(el);

        range.setStart(textNode, startOffset);
        range.setEnd(textNode, endOffset);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    else if (doc.body.createTextRange)
    {
        range = doc.body.createTextRange();
        range.moveToElementText(textNode);
        range.select();
    }
}