function string_search(regexp)
{
    var re;
    var globalSave;
    var lastIndexSave;

    if (regexp instanceof $rt_RegExp)
        re = regexp;
    else
        re = new $rt_RegExp(regexp);

    globalSave = re.global;
    lastIndexSave = re.lastIndex;
    re.global = true;
    re.lastIndex = 0;

    var matchIndex = -1;
    var match = re.exec(this);
    if (match !== null)
    {
        matchIndex = re.lastIndex - match[0].length;
    }

    re.global = globalSave;
    re.lastIndex = lastIndexSave;
    return matchIndex;
}