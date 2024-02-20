function buildObjects( geometries, instanceMaterials ) {

      var objects = [];

      for ( var type in geometries ) {

        var geometry = geometries[ type ];

        var materials = resolveMaterialBinding( geometry.materialKeys, instanceMaterials );

        // handle case if no materials are defined

        if ( materials.length === 0 ) {

          if ( type === 'lines' || type === 'linestrips' ) {

            materials.push( new THREE.LineBasicMaterial() );

          } else {

            materials.push( new THREE.MeshPhongMaterial() );

          }

        }

        // regard skinning

        var skinning = ( geometry.data.attributes.skinIndex !== undefined );

        if ( skinning ) {

          for ( var i = 0, l = materials.length; i < l; i ++ ) {

            materials[ i ].skinning = true;

          }

        }

        // choose between a single or multi materials (material array)

        var material = ( materials.length === 1 ) ? materials[ 0 ] : materials;

        // now create a specific 3D object

        var object;

        switch ( type ) {

          case 'lines':
            object = new THREE.LineSegments( geometry.data, material );
            break;

          case 'linestrips':
            object = new THREE.Line( geometry.data, material );
            break;

          case 'triangles':
          case 'polylist':
            if ( skinning ) {

              object = new THREE.SkinnedMesh( geometry.data, material );

            } else {

              object = new THREE.Mesh( geometry.data, material );

            }
            break;

        }

        objects.push( object );

      }

      return objects;

    }