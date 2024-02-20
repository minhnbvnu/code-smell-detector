function getLight( id ) {

      var data = library.lights[ id ];

      if ( data !== undefined ) {

        return getBuild( data, buildLight );

      }

      console.warn( 'THREE.ColladaLoader: Couldn\'t find light with ID:', id );

      return null;

    }