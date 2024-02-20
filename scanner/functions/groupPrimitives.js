function groupPrimitives( primitives ) {

      var build = {};

      for ( var i = 0; i < primitives.length; i ++ ) {

        var primitive = primitives[ i ];

        if ( build[ primitive.type ] === undefined ) build[ primitive.type ] = [];

        build[ primitive.type ].push( primitive );

      }

      return build;

    }