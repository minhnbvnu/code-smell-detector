function check_equal_arrays(arr1, arr2, msg)
{
    if (arr1.length !== arr2.length)
        throw msg+" bad: ["+arr1+"] ["+arr2+"]";

    for (var i=0; i<arr1.length; i++)
        if (arr1[i] !== arr2[i])
            throw msg+" bad: ["+arr1+"] ["+arr2+"]";
}