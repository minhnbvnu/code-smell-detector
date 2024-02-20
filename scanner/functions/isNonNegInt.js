function isNonNegInt(val)
{
    return (
        isInt(val) &&
        val >= 0
    );
}