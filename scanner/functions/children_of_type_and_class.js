function children_of_type_and_class(n, nodeName, className)
{
    var selected = [];

    for(var i = 0; i < n.childNodes.length; i++)
    {
        var child = n.childNodes[i];

        if(child.nodeName == nodeName && child.className == className)
        {
            selected.push(child);
        }
    }
    return selected;
}