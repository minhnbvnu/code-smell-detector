function defineTags()
{
    for (var i = 0; i < arguments.length; ++i)
    {
        var tagName = arguments[i];
        var fn = new Function("var newTag = new Domplate.DomplateTag('"+tagName+"'); return newTag.merge(arguments);");

        var fnName = tagName.toUpperCase();
        Domplate[fnName] = fn;
    }
}