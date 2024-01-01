function parseAnimations( json, geometry ) {

        var outputAnimations = [];

        // parse old style Bone/Hierarchy animations
        var animations = [];

        if ( json.animation !== undefined ) {

          animations.push( json.animation );

        }

        if ( json.animations !== undefined ) {

          if ( json.animations.length ) {

            animations = animations.concat( json.animations );

          } else {

            animations.push( json.animations );

          }

        }

        for ( var i = 0; i < animations.length; i ++ ) {

          var clip = THREE.AnimationClip.parseAnimation( animations[ i ], geometry.bones );
          if ( clip ) outputAnimations.push( clip );

        }

        // parse implicit morph animations
        if ( geometry.morphTargets ) {

          // TODO: Figure out what an appropraite FPS is for morph target animations -- defaulting to 10, but really it is completely arbitrary.
          var morphAnimationClips = THREE.AnimationClip.CreateClipsFromMorphTargetSequences( geometry.morphTargets, 10 );
          outputAnimations = outputAnimations.concat( morphAnimationClips );

        }

        if ( outputAnimations.length > 0 ) geometry.animations = outputAnimations;

      }