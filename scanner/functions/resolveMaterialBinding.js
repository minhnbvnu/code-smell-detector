function resolveMaterialBinding( keys, instanceMaterials ) {

      var materials = [];

      for ( var i = 0, l = keys.length; i < l; i ++ ) {

        var id = instanceMaterials[ keys[ i ] ];

        if ( id === undefined ) {

          console.warn( 'THREE.ColladaLoader: Material with key %s not found. Apply fallback material.', keys[ i ] );
          materials.push( fallbackMaterial );

        } else {

          materials.push( getMaterial( id ) );

        }

      }

      return materials;

    }