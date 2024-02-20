function getNormalIndex(normal) {

      var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

      if (normalsHash[hash] !== undefined) {

        return normalsHash[hash];

      }

      normalsHash[hash] = normals.length / 3;
      normals.push(normal.x, normal.y, normal.z);

      return normalsHash[hash];

    }