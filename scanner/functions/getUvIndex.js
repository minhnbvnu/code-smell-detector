function getUvIndex(uv) {

      var hash = uv.x.toString() + uv.y.toString();

      if (uvsHash[hash] !== undefined) {

        return uvsHash[hash];

      }

      uvsHash[hash] = uvs.length / 2;
      uvs.push(uv.x, uv.y);

      return uvsHash[hash];

    }