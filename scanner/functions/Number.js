function Number(value)
{
    // If this is a constructor call (new Number)
    if ($rt_isGlobalObj(this) === false)
    {
        // Convert the value to a number
        var numVal = $rt_toNumber(value);

        // If the value is not a number, return it directly
        if (isNaN(numVal))
            return numVal;

        // Store the value in the new object
        this.value = numVal;
    }
    else
    {
        // Convert the value to a number
        return $rt_toNumber(value);
    }
}