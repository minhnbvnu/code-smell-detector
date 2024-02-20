function BFSGraph(no_of_nodes, verbose) {
    if (verbose === undefined) {
        verbose = false;
    }
    var expected_no_of_nodes = 3000000;
    var expected_total_cost = 26321966;
    var t1 = performance.now();
    var inits = InitializeGraph(no_of_nodes);
    var h_graph_nodes = inits.h_graph_nodes;
    var h_graph_mask = inits.h_graph_mask;
    var h_updating_graph_mask = inits.h_updating_graph_mask;
    var h_graph_visited = inits.h_graph_visited;
    var h_cost = inits.h_cost;
    var h_graph_edges = inits.h_graph_edges;
    var t2 = performance.now();
    var init_time = t2 - t1;

    var k = 0;
    var stop;

    t1 = performance.now();
    do {
        stop = false;

        for(var tid = 0; tid < no_of_nodes; ++tid) {
            if (h_graph_mask[tid]) {
                h_graph_mask[tid] = false;
                for ( var i = h_graph_nodes[tid].starting
                      ; i < (h_graph_nodes[tid].no_of_edges + h_graph_nodes[tid].starting)
                      ; ++i) {
                    var id = h_graph_edges[i];
                    if (!h_graph_visited[id]) {
                        h_cost[id] = h_cost[tid] + 1;
                        h_updating_graph_mask[id] = true;
                    }
                }
            }
        }

        for (var tid = 0; tid < no_of_nodes; ++tid) {
            if (h_updating_graph_mask[tid]) {
                h_graph_mask[tid] = true;
                h_graph_visited[tid] = true;
                stop = true;
                h_updating_graph_mask[tid] = false;
            }
        }
        ++k;
    }
    while(stop);
    t2 = performance.now();
    var traversal_time = t2 - t1;

    var total_cost = 0;
    for (var i=0; i<no_of_nodes; ++i) {
        total_cost += h_cost[i];
    }
    if (no_of_nodes == expected_no_of_nodes) {
        if (total_cost != expected_total_cost) {
            throw new Error("ERROR: the total cost obtained for '" + no_of_nodes + "' nodes is '" + total_cost + "' while the expected cost is '" + expected_total_cost + "'");
        }
    } else {
        console.log("WARNING: no self-checking step for '" + no_of_nodes + "' nodes, only valid for '" + expected_no_of_nodes + "' nodes");
    }

    console.log("Init time     : " + (init_time/1000) + " s");
    console.log("Traversal time: " + (traversal_time/1000) + " s");

    if (verbose) {
        for (var i = 0; i < no_of_nodes; ++i) {
            console.log(i + ") cost: " + h_cost[i]);
        }
    }

    return { status: 1,
             options: "BFSGraph(" + no_of_nodes + ")",
             time: traversal_time / 1000 };
}