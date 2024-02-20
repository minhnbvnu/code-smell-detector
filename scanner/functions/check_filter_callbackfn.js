function check_filter_callbackfn(val, index, arr)
{
    check_filter_sum += (val + index * 100 + arr.length * 10000);
    return (val & 1) === 1;
}