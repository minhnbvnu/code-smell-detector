function graphSum(root)
{
    //iir.trace_print('entering graphSum');

    var visited = [];

    var sum = 0;

    function visit(n)
    {
        //iir.trace_print('entering visit');

        if (visited.indexOf(n) !== -1)
            return;

        //iir.trace_print('calling push');

        visited.push(n);

        //iir.trace_print('called push');

        sum += n.value;

        for (var i = 0; i < n.edges.length; ++i)
            visit(n.edges[i]);

        //iir.trace_print('leaving visit');
    }

    visit(root);

    //iir.trace_print('leaving graphSum');

    return sum;
}