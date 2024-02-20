function remEdge(n)
{
    //iir.trace_print('remEdge');

    var idx = this.edges.indexOf(n);

    //iir.trace_print('splicing');

    if (idx !== -1)
        this.edges.splice(idx, 1);
    else
        error('edge missing');

    //iir.trace_print('leaving remEdge');
}