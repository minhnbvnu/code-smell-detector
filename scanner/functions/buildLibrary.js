function buildLibrary( data, builder ) {

      for ( var name in data ) {

        var object = data[ name ];
        object.build = builder( data[ name ] );

      }

    }