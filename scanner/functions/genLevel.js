function genLevel (
    level
)
{
    var s = "";

    for (var i = 0; i < level; i++)
        s += " | ";
    if (level > 0)
        s += " ";
    return s;
}