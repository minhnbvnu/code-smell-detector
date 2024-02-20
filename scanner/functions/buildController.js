function buildController( data ) {

      var build = {
        id: data.id
      };

      var geometry = library.geometries[ build.id ];

      if ( data.skin !== undefined ) {

        build.skin = buildSkin( data.skin );

        // we enhance the 'sources' property of the corresponding geometry with our skin data

        geometry.sources.skinIndices = build.skin.indices;
        geometry.sources.skinWeights = build.skin.weights;

      }

      return build;

    }