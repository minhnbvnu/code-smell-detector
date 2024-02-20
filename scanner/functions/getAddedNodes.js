function getAddedNodes(mutations) {
        var nodes = [];
        for (var i = 0; i < mutations.length; i += 1) {
          var addedNodes = mutations[i].addedNodes;
          for (var j = 0; j < addedNodes.length; j += 1) {
            nodes.push(addedNodes[j]);
          }
        }
        return nodes;
      }