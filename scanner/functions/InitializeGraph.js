function InitializeGraph(no_of_nodes) {
    var h_graph_nodes = new Array(no_of_nodes);
    var h_graph_mask = new Uint8Array(no_of_nodes);
    var h_updating_graph_mask = new Uint8Array(no_of_nodes);
    var h_graph_visited = new Uint8Array(no_of_nodes);
    var h_cost = new Uint32Array(no_of_nodes);

    var source = 0;
    var graph = new Array(no_of_nodes);
    for (var i = 0; i < no_of_nodes; ++i) {
        graph[i] = [];
    }

    for (var i = 0; i < no_of_nodes; ++i) {
        var no_of_edges = Math.abs(Math.commonRandom() % ( MAX_INIT_EDGES - MIN_EDGES + 1 )) + MIN_EDGES;
        for (var j = 0; j < no_of_edges; ++j) {
            var node_id = Math.abs(Math.commonRandom() % no_of_nodes);
            var weight = Math.abs(Math.commonRandom() % ( MAX_WEIGHT - MIN_WEIGHT + 1 )) + MIN_WEIGHT;

            graph[i].push(edge(node_id, weight));
            graph[node_id].push(edge(i, weight));
        }
    }

    var total_edges = 0;
    for (var i = 0; i < no_of_nodes; ++i) {
        var no_of_edges = graph[i].length;
        h_graph_nodes[i] = node(total_edges, no_of_edges);
        h_graph_mask[i] = false;
        h_updating_graph_mask[i] = false;
        h_graph_visited[i] = false;

        total_edges += no_of_edges;
    }

    h_graph_mask[source] = true;
    h_graph_visited[source] = true;

    var h_graph_edges = new Array(total_edges);

    var k = 0;
    for (var i = 0; i < no_of_nodes; ++i) {
        for (var j = 0; j < graph[i].length; ++j) {
            h_graph_edges[k] = graph[i][j].dest;
            ++k;
        }
    }

    for (var i = 0; i < no_of_nodes; ++i) {
        h_cost[i] = -1;
    }
    h_cost[source] = 0;

    return {
        h_graph_nodes: h_graph_nodes,
        h_graph_mask: h_graph_mask,
        h_updating_graph_mask: h_updating_graph_mask,
        h_graph_visited: h_graph_visited,
        h_cost: h_cost,
        h_graph_edges: h_graph_edges
    }
}