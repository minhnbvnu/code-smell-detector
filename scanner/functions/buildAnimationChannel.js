function buildAnimationChannel( channel, inputSource, outputSource ) {

      var node = library.nodes[ channel.id ];
      var object3D = getNode( node.id );

      var transform = node.transforms[ channel.sid ];
      var defaultMatrix = node.matrix.clone().transpose();

      var time, stride;
      var i, il, j, jl;

      var data = {};

      // the collada spec allows the animation of data in various ways.
      // depending on the transform type (matrix, translate, rotate, scale), we execute different logic

      switch ( transform ) {

        case 'matrix':

          for ( i = 0, il = inputSource.array.length; i < il; i ++ ) {

            time = inputSource.array[ i ];
            stride = i * outputSource.stride;

            if ( data[ time ] === undefined ) data[ time ] = {};

            if ( channel.arraySyntax === true ) {

              var value = outputSource.array[ stride ];
              var index = channel.indices[ 0 ] + 4 * channel.indices[ 1 ];

              data[ time ][ index ] = value;

            } else {

              for ( j = 0, jl = outputSource.stride; j < jl; j ++ ) {

                data[ time ][ j ] = outputSource.array[ stride + j ];

              }

            }

          }

          break;

        case 'translate':
          console.warn( 'THREE.ColladaLoader: Animation transform type "%s" not yet implemented.', transform );
          break;

        case 'rotate':
          console.warn( 'THREE.ColladaLoader: Animation transform type "%s" not yet implemented.', transform );
          break;

        case 'scale':
          console.warn( 'THREE.ColladaLoader: Animation transform type "%s" not yet implemented.', transform );
          break;

      }

      var keyframes = prepareAnimationData( data, defaultMatrix );

      var animation = {
        name: object3D.uuid,
        keyframes: keyframes
      };

      return animation;

    }