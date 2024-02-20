function addStates(data) {
          // *********** Convert flat data into a nice tree ***************
          data = data.map(function (node) {
            return node.name === "" ? root : angular.copy(node);
          });
          angular.extend(stateMap, data.reduce(function (map, node) {
            map[node.name] = node;
            return map;
          }, {}));

          data.forEach(function (node) {
            // add to parent
            var parentName = node.name.split(/\./).slice(0, -1).join(".");
            var parent = node.name != parentName && stateMap[parentName];
            if (parent) {
              (parent.children || (parent.children = [])).push(node); // create child array if it doesn't exist
              node.px = parent.px;
              node.py = parent.py;
              nodes.push(node);
            }
          });
        }