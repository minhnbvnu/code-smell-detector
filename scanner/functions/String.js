function String(value)
{
    // Convert the argument value to a string
    var strVal = ($argc > 0)? $rt_toString(value):'';

    // If this is not a constructor call (new String)
    if ($rt_isGlobalObj(this))
    {
        // Return the string value
        return strVal;
    }
    else
    {
        // Create indexes
        for (var i = 0; i < strVal.length; i++)
        {
            Object.defineProperty(this, i,
            {
                enumerable: true,
                value: strVal[i],
            });
        }

        // Store the value in the new object
        // Value is read-only and not enumerable
        Object.defineProperty(this, "value",
        {
            value: strVal,
        });

        // Set length property.
        Object.defineProperty(this, "length",
        {
            value: strVal.length,
        });
    }
}