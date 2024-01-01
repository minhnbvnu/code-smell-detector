function parseSkin( json, geometry ) {

        var influencesPerVertex = ( json.influencesPerVertex !== undefined ) ? json.influencesPerVertex : 2;

        if ( json.skinWeights ) {

          for ( var i = 0, l = json.skinWeights.length; i < l; i += influencesPerVertex ) {

            var x = json.skinWeights[ i ];
            var y = ( influencesPerVertex > 1 ) ? json.skinWeights[ i + 1 ] : 0;
            var z = ( influencesPerVertex > 2 ) ? json.skinWeights[ i + 2 ] : 0;
            var w = ( influencesPerVertex > 3 ) ? json.skinWeights[ i + 3 ] : 0;

            geometry.skinWeights.push( new THREE.Vector4( x, y, z, w ) );

          }

        }

        if ( json.skinIndices ) {

          for ( var i = 0, l = json.skinIndices.length; i < l; i += influencesPerVertex ) {

            var a = json.skinIndices[ i ];
            var b = ( influencesPerVertex > 1 ) ? json.skinIndices[ i + 1 ] : 0;
            var c = ( influencesPerVertex > 2 ) ? json.skinIndices[ i + 2 ] : 0;
            var d = ( influencesPerVertex > 3 ) ? json.skinIndices[ i + 3 ] : 0;

            geometry.skinIndices.push( new THREE.Vector4( a, b, c, d ) );

          }

        }

        geometry.bones = json.bones;

        if ( geometry.bones && geometry.bones.length > 0 && ( geometry.skinWeights.length !== geometry.skinIndices.length || geometry.skinIndices.length !== geometry.vertices.length ) ) {

          console.warn( 'When skinning, number of vertices (' + geometry.vertices.length + '), skinIndices (' +
            geometry.skinIndices.length + '), and skinWeights (' + geometry.skinWeights.length + ') should match.' );

        }

      }