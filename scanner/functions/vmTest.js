function vmTest()
{
    var r = run(
        [
            ['push', 1]
        ], 
        false
    );
    if (r !== 1)
        return 1;

    var r = run(
        [
            ['push', 'foo'],
            ['push', 1],
            ['add']
        ], 
        false
    );
    if (r !== 'foo1')
        return 2;

    var r = run(
        [
            ['push', 'foo'],
            ['push', 1],
            ['swap']
        ], 
        false
    );
    if (r !== 'foo')
        return 3;

    var r = run(
        [
            ['push', 0],
            ['dup'],
            ['push', 1],
            ['jlt', 500],
            ['push', 5]
        ], 
        false
    );
    if (r !== 0)
        return 4;

    var r = run(
        [
            // n = 3
            ['push', 3],

            // Call f(3)
            ['call', 3],

            // Stop execution
            ['exit'],

            // Entry point for f(n)
            ['swap'],

            ['push', 1],
            ['add'],

            ['swap'],
            ['ret']
        ], 
        false
    );
    if (r !== 4)
        return 5;

    // Fibonacci
    var r = run(
        [
            // n = 8
            ['push', 8],

            // Call fib(n)
            ['call', 3],

            // Stop execution
            ['exit'],

            // stack:
            // n
            // ra

            //
            // fib(n) entry point
            //
            ['swap'],

            // stack:
            // ra
            // n

            // if (n < 2) goto ret
            ['dup'],
            ['push', 2],
            ['jlt', 16],

            // stack:
            // ra
            // n

            // Compute n - 1
            ['dup'],
            ['push', 1],
            ['sub'],

            // stack:
            // ra
            // n
            // n - 1

            // Compute fib(n-1)
            ['call', 3],

            // stack:
            // ra
            // n
            // fib(n-1)

            // Compute n - 2
            ['swap'],
            ['push', 2],
            ['sub'],

            // stack:
            // ra
            // fib(n-1)
            // n-2

            // Compute fib(n-2)
            ['call', 3],

            // stack:
            // ra
            // fib(n-1)
            // fib(n-2)

            // Compute fib(n-1) + fib(n-2)
            ['add'],

            // stack:
            // ra
            // fib(n-1) + fib(n-2)

            // Return to caller
            ['swap'],
            ['ret']
        ], 
        false
    );
    if (r !== 21)
        return 3;

    return 0;
}