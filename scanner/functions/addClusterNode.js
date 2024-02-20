function addClusterNode(row, clusters, graph) {
    if (row.contractedFrom) {
        if (!clusters[hash(row.contractedFrom)] && row.contractedFrom[0] === 'E') {
            const patientCode = letterToCode(row.contractedFrom)
            clusters[hash(row.contractedFrom)] = row.contractedFrom

            let clusterNode = {
                id: patientCode,
                label: 'Event ' + row.contractedFrom[1],
                shape: 'image',
                size: 60,
                image: cluster_node,
            }
            graph = dotProp.set(graph, 'nodes', list => [...list, clusterNode])
        }
    }
    return graph;
}