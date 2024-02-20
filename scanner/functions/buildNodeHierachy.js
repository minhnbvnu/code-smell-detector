function buildNodeHierachy(nodeId, parentObject, json, parser) {

    var nodeDef = json.nodes[nodeId];

    return parser.getDependency('node', nodeId).then(function(node) {

      if (nodeDef.skin === undefined) return node;

      // build skeleton here as well

      var skinEntry;

      return parser.getDependency('skin', nodeDef.skin).then(function(skin) {

        skinEntry = skin;

        var pendingJoints = [];

        for (var i = 0, il = skinEntry.joints.length; i < il; i++) {

          pendingJoints.push(parser.getDependency('node', skinEntry.joints[i]));

        }

        return Promise.all(pendingJoints);

      }).then(function(jointNodes) {

        var meshes = node.isGroup === true ? node.children : [node];

        for (var i = 0, il = meshes.length; i < il; i++) {

          var mesh = meshes[i];

          var bones = [];
          var boneInverses = [];

          for (var j = 0, jl = jointNodes.length; j < jl; j++) {

            var jointNode = jointNodes[j];

            if (jointNode) {

              bones.push(jointNode);

              var mat = new THREE.Matrix4();

              if (skinEntry.inverseBindMatrices !== undefined) {

                mat.fromArray(skinEntry.inverseBindMatrices.array, j * 16);

              }

              boneInverses.push(mat);

            } else {

              console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinEntry.joints[j]);

            }

          }

          mesh.bind(new THREE.Skeleton(bones, boneInverses), mesh.matrixWorld);

        };

        return node;

      });

    }).then(function(node) {

      // build node hierachy

      parentObject.add(node);

      var pending = [];

      if (nodeDef.children) {

        var children = nodeDef.children;

        for (var i = 0, il = children.length; i < il; i++) {

          var child = children[i];
          pending.push(buildNodeHierachy(child, node, json, parser));

        }

      }

      return Promise.all(pending);

    });

  }