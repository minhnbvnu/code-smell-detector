function addFace(a, b, c, materialIndex) {

      var vertexColors = (colors === undefined) ? [] : [
        scope.colors[a].clone(),
        scope.colors[b].clone(),
        scope.colors[c].clone()
      ];

      var vertexNormals = (normals === undefined) ? [] : [
        new Vector3().fromArray(normals, a * 3),
        new Vector3().fromArray(normals, b * 3),
        new Vector3().fromArray(normals, c * 3)
      ];

      var face = new Face3(a, b, c, vertexNormals, vertexColors, materialIndex);

      scope.faces.push(face);

      if (uvs !== undefined) {

        scope.faceVertexUvs[0].push([
          new Vector2().fromArray(uvs, a * 2),
          new Vector2().fromArray(uvs, b * 2),
          new Vector2().fromArray(uvs, c * 2)
        ]);

      }

      if (uvs2 !== undefined) {

        scope.faceVertexUvs[1].push([
          new Vector2().fromArray(uvs2, a * 2),
          new Vector2().fromArray(uvs2, b * 2),
          new Vector2().fromArray(uvs2, c * 2)
        ]);

      }

    }