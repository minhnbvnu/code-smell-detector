function buildGeometry( data ) {

      var build = {};

      var sources = data.sources;
      var vertices = data.vertices;
      var primitives = data.primitives;

      if ( primitives.length === 0 ) return {};

      // our goal is to create one buffer geometry for a single type of primitives
      // first, we group all primitives by their type

      var groupedPrimitives = groupPrimitives( primitives );

      for ( var type in groupedPrimitives ) {

        var primitiveType = groupedPrimitives[ type ];

        // second, ensure consistent uv coordinates for each type of primitives (polylist,triangles or lines)

        checkUVCoordinates( primitiveType );

        // third, create a buffer geometry for each type of primitives

        build[ type ] = buildGeometryType( primitiveType, sources, vertices );

      }

      return build;

    }