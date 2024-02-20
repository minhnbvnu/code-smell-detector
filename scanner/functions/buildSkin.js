function buildSkin( data ) {

      var BONE_LIMIT = 4;

      var build = {
        joints: [], // this must be an array to preserve the joint order
        indices: {
          array: [],
          stride: BONE_LIMIT
        },
        weights: {
          array: [],
          stride: BONE_LIMIT
        }
      };

      var sources = data.sources;
      var vertexWeights = data.vertexWeights;

      var vcount = vertexWeights.vcount;
      var v = vertexWeights.v;
      var jointOffset = vertexWeights.inputs.JOINT.offset;
      var weightOffset = vertexWeights.inputs.WEIGHT.offset;

      var jointSource = data.sources[ data.joints.inputs.JOINT ];
      var inverseSource = data.sources[ data.joints.inputs.INV_BIND_MATRIX ];

      var weights = sources[ vertexWeights.inputs.WEIGHT.id ].array;
      var stride = 0;

      var i, j, l;

      // procces skin data for each vertex

      for ( i = 0, l = vcount.length; i < l; i ++ ) {

        var jointCount = vcount[ i ]; // this is the amount of joints that affect a single vertex
        var vertexSkinData = [];

        for ( j = 0; j < jointCount; j ++ ) {

          var skinIndex = v[ stride + jointOffset ];
          var weightId = v[ stride + weightOffset ];
          var skinWeight = weights[ weightId ];

          vertexSkinData.push( { index: skinIndex, weight: skinWeight } );

          stride += 2;

        }

        // we sort the joints in descending order based on the weights.
        // this ensures, we only procced the most important joints of the vertex

        vertexSkinData.sort( descending );

        // now we provide for each vertex a set of four index and weight values.
        // the order of the skin data matches the order of vertices

        for ( j = 0; j < BONE_LIMIT; j ++ ) {

          var d = vertexSkinData[ j ];

          if ( d !== undefined ) {

            build.indices.array.push( d.index );
            build.weights.array.push( d.weight );

          } else {

            build.indices.array.push( 0 );
            build.weights.array.push( 0 );

          }

        }

      }

      // setup bind matrix

      if ( data.bindShapeMatrix ) {

        build.bindMatrix = new THREE.Matrix4().fromArray( data.bindShapeMatrix ).transpose();

      } else {

        build.bindMatrix = new THREE.Matrix4().identity();

      }

      // process bones and inverse bind matrix data

      for ( i = 0, l = jointSource.array.length; i < l; i ++ ) {

        var name = jointSource.array[ i ];
        var boneInverse = new THREE.Matrix4().fromArray( inverseSource.array, i * inverseSource.stride ).transpose();

        build.joints.push( { name: name, boneInverse: boneInverse } );

      }

      return build;

      // array sort function

      function descending( a, b ) {

        return b.weight - a.weight;

      }

    }