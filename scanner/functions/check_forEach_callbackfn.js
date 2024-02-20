function check_forEach_callbackfn(val, index, arr)
{
    check_forEach_sum += (val + index * 100 + arr.length * 10000);
}