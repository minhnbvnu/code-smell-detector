function addPatientNode(patientCode, row, graph) {
    let node = {
        id: patientCode,
        label: 'P' + row.patientId,
        shape: 'image',
        image: getIcon(row),
        group: 'patient'
    }

    graph = dotProp.set(graph, 'nodes', list => [...list, node])
    return graph;
}