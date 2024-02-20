function DOTToGraph(data) {
    // parse the DOT file
    var dotData = parseDOT(data);
    var graphData = {
      nodes: [],
      edges: [],
      options: {}
    };

    // copy the nodes
    if (dotData.nodes) {
      dotData.nodes.forEach(function (dotNode) {
        var graphNode = {
          id: dotNode.id,
          label: String(dotNode.label || dotNode.id)
        };
        merge(graphNode, convertAttr(dotNode.attr, NODE_ATTR_MAPPING));
        if (graphNode.image) {
          graphNode.shape = 'image';
        }
        graphData.nodes.push(graphNode);
      });
    }

    // copy the edges
    if (dotData.edges) {
      /**
       * Convert an edge in DOT format to an edge with VisGraph format
       * @param {Object} dotEdge
       * @returns {Object} graphEdge
       */
      var convertEdge = function convertEdge(dotEdge) {
        var graphEdge = {
          from: dotEdge.from,
          to: dotEdge.to
        };
        merge(graphEdge, convertAttr(dotEdge.attr, EDGE_ATTR_MAPPING));
        graphEdge.arrows = dotEdge.type === '->' ? 'to' : undefined;

        return graphEdge;
      };

      dotData.edges.forEach(function (dotEdge) {
        var from, to;
        if (dotEdge.from instanceof Object) {
          from = dotEdge.from.nodes;
        } else {
          from = {
            id: dotEdge.from
          };
        }

        // TODO: support of solid/dotted/dashed edges (attr = 'style')
        // TODO: support for attributes 'dir' and 'arrowhead' (edge arrows)

        if (dotEdge.to instanceof Object) {
          to = dotEdge.to.nodes;
        } else {
          to = {
            id: dotEdge.to
          };
        }

        if (dotEdge.from instanceof Object && dotEdge.from.edges) {
          dotEdge.from.edges.forEach(function (subEdge) {
            var graphEdge = convertEdge(subEdge);
            graphData.edges.push(graphEdge);
          });
        }

        forEach2(from, to, function (from, to) {
          var subEdge = createEdge(graphData, from.id, to.id, dotEdge.type, dotEdge.attr);
          var graphEdge = convertEdge(subEdge);
          graphData.edges.push(graphEdge);
        });

        if (dotEdge.to instanceof Object && dotEdge.to.edges) {
          dotEdge.to.edges.forEach(function (subEdge) {
            var graphEdge = convertEdge(subEdge);
            graphData.edges.push(graphEdge);
          });
        }
      });
    }

    // copy the options
    if (dotData.attr) {
      graphData.options = dotData.attr;
    }

    return graphData;
  }