function check_map_callbackfn(val, index, arr)
{
    check_map_sum += (val + index * 100 + arr.length * 10000);
    return val*val + 1000;
}