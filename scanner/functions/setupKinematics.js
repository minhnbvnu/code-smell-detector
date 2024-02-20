function setupKinematics() {

      var kinematicsModelId = Object.keys( library.kinematicsModels )[ 0 ];
      var kinematicsSceneId = Object.keys( library.kinematicsScenes )[ 0 ];
      var visualSceneId = Object.keys( library.visualScenes )[ 0 ];

      if ( kinematicsModelId === undefined || kinematicsSceneId === undefined ) return;

      var kinematicsModel = getKinematicsModel( kinematicsModelId );
      var kinematicsScene = getKinematicsScene( kinematicsSceneId );
      var visualScene = getVisualScene( visualSceneId );

      var bindJointAxis = kinematicsScene.bindJointAxis;
      var jointMap = {};

      for ( var i = 0, l = bindJointAxis.length; i < l; i ++ ) {

        var axis = bindJointAxis[ i ];

        // the result of the following query is an element of type 'translate', 'rotate','scale' or 'matrix'

        var targetElement = collada.querySelector( '[sid="' + axis.target + '"]' );

        if ( targetElement ) {

          // get the parent of the transfrom element

          var parentVisualElement = targetElement.parentElement;

          // connect the joint of the kinematics model with the element in the visual scene

          connect( axis.jointIndex, parentVisualElement );

        }

      }

      function connect( jointIndex, visualElement ) {

        var visualElementName = visualElement.getAttribute( 'name' );
        var joint = kinematicsModel.joints[ jointIndex ];

        visualScene.traverse( function ( object ) {

          if ( object.name === visualElementName ) {

            jointMap[ jointIndex ] = {
              object: object,
              transforms: buildTransformList( visualElement ),
              joint: joint,
              position: joint.zeroPosition
            };

          }

        } );

      }

      var m0 = new THREE.Matrix4();

      kinematics = {

        joints: kinematicsModel && kinematicsModel.joints,

        getJointValue: function ( jointIndex ) {

          var jointData = jointMap[ jointIndex ];

          if ( jointData ) {

            return jointData.position;

          } else {

            console.warn( 'THREE.ColladaLoader: Joint ' + jointIndex + ' doesn\'t exist.' );

          }

        },

        setJointValue: function ( jointIndex, value ) {

          var jointData = jointMap[ jointIndex ];

          if ( jointData ) {

            var joint = jointData.joint;

            if ( value > joint.limits.max || value < joint.limits.min ) {

              console.warn( 'THREE.ColladaLoader: Joint ' + jointIndex + ' value ' + value + ' outside of limits (min: ' + joint.limits.min + ', max: ' + joint.limits.max + ').' );

            } else if ( joint.static ) {

              console.warn( 'THREE.ColladaLoader: Joint ' + jointIndex + ' is static.' );

            } else {

              var object = jointData.object;
              var axis = joint.axis;
              var transforms = jointData.transforms;

              matrix.identity();

              // each update, we have to apply all transforms in the correct order

              for ( var i = 0; i < transforms.length; i ++ ) {

                var transform = transforms[ i ];

                // if there is a connection of the transform node with a joint, apply the joint value

                if ( transform.sid && transform.sid.indexOf( jointIndex ) !== - 1 ) {

                  switch ( joint.type ) {

                    case 'revolute':
                      matrix.multiply( m0.makeRotationAxis( axis, THREE.MathUtils.degToRad( value ) ) );
                      break;

                    case 'prismatic':
                      matrix.multiply( m0.makeTranslation( axis.x * value, axis.y * value, axis.z * value ) );
                      break;

                    default:
                      console.warn( 'THREE.ColladaLoader: Unknown joint type: ' + joint.type );
                      break;

                  }

                } else {

                  switch ( transform.type ) {

                    case 'matrix':
                      matrix.multiply( transform.obj );
                      break;

                    case 'translate':
                      matrix.multiply( m0.makeTranslation( transform.obj.x, transform.obj.y, transform.obj.z ) );
                      break;

                    case 'scale':
                      matrix.scale( transform.obj );
                      break;

                    case 'rotate':
                      matrix.multiply( m0.makeRotationAxis( transform.obj, transform.angle ) );
                      break;

                  }

                }

              }

              object.matrix.copy( matrix );
              object.matrix.decompose( object.position, object.quaternion, object.scale );

              jointMap[ jointIndex ].position = value;

            }

          } else {

            console.log( 'THREE.ColladaLoader: ' + jointIndex + ' does not exist.' );

          }

        }

      };

    }