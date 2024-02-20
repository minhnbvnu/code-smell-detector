function parseMorphing(json, geometry) {

      var scale = json.scale;

      if (json.morphTargets !== undefined) {

        for (var i = 0, l = json.morphTargets.length; i < l; i++) {

          geometry.morphTargets[i] = {};
          geometry.morphTargets[i].name = json.morphTargets[i].name;
          geometry.morphTargets[i].vertices = [];

          var dstVertices = geometry.morphTargets[i].vertices;
          var srcVertices = json.morphTargets[i].vertices;

          for (var v = 0, vl = srcVertices.length; v < vl; v += 3) {

            var vertex = new Vector3();
            vertex.x = srcVertices[v] * scale;
            vertex.y = srcVertices[v + 1] * scale;
            vertex.z = srcVertices[v + 2] * scale;

            dstVertices.push(vertex);

          }

        }

      }

      if (json.morphColors !== undefined && json.morphColors.length > 0) {

        console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.');

        var faces = geometry.faces;
        var morphColors = json.morphColors[0].colors;

        for (var i = 0, l = faces.length; i < l; i++) {

          faces[i].color.fromArray(morphColors, i * 3);

        }

      }

    }