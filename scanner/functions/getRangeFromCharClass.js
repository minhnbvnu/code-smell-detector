function getRangeFromCharClass(atomAstNode, context)
{
    var ranges = [];

    for (var i = 0; i < atomAstNode.classAtoms.length; ++i)
    {
        if (context.ignoreCase)
        {
            var ca = atomAstNode.classAtoms[i];

            if (ca.max === undefined)
            {
                if (ca.min.value >= 97 && ca.min.value <= 122)
                {
                    ranges.push([ca.min.value, ca.min.value]);
                    ranges.push([ca.min.value - 32, ca.min.value - 32]);
                }
                else if (ca.min.value >= 65 && ca.min.value <= 90)
                {
                    ranges.push([ca.min.value, ca.min.value]);
                    ranges.push([ca.min.value + 32, ca.min.value + 32]);
                }
                else
                {
                    ranges.push([ca.min.value, ca.min.value]);
                }
            }
            else
            {
                ranges.push(ca.max === undefined ? [ca.min.value, ca.min.value] : [ca.min.value, ca.max.value]);
            }
        }
        else
        {
            var ca = atomAstNode.classAtoms[i];
            if (ca.min instanceof RegExpCharacterClass)
            {
                ranges = ranges.concat(getRangeFromCharClass(ca.min, context));
            }
            else
            {
                ranges.push(ca.max === undefined ? [ca.min.value, ca.min.value] : [ca.min.value, ca.max.value]);
            }
        }
    }
    return ranges;
}