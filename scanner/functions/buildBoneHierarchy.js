function buildBoneHierarchy( root, joints, boneData ) {

      // setup bone data from visual scene

      root.traverse( function ( object ) {

        if ( object.isBone === true ) {

          var boneInverse;

          // retrieve the boneInverse from the controller data

          for ( var i = 0; i < joints.length; i ++ ) {

            var joint = joints[ i ];

            if ( joint.name === object.name ) {

              boneInverse = joint.boneInverse;
              break;

            }

          }

          if ( boneInverse === undefined ) {

            // Unfortunately, there can be joints in the visual scene that are not part of the
            // corresponding controller. In this case, we have to create a dummy boneInverse matrix
            // for the respective bone. This bone won't affect any vertices, because there are no skin indices
            // and weights defined for it. But we still have to add the bone to the sorted bone list in order to
            // ensure a correct animation of the model.

            boneInverse = new THREE.Matrix4();

          }

          boneData.push( { bone: object, boneInverse: boneInverse, processed: false } );

        }

      } );

    }