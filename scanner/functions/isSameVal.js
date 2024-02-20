function isSameVal(val1, val2)
    {
        //check for +0 and -0
        if (val1 === 0 && val2 === 0)
            return (1 / val1) === (1 / val2);

        // Check for NaN
        if (val1 !== val1 && val2 !== val2)
            return true;

        return val1 === val2;
    }