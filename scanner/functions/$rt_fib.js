function $rt_fib(n)
{
    if (n < 2)
        return n;

    return $rt_fib(n-1) + $rt_fib(n-2);
}