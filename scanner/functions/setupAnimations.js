function setupAnimations() {

      var clips = library.clips;

      if ( isEmpty( clips ) === true ) {

        if ( isEmpty( library.animations ) === false ) {

          // if there are animations but no clips, we create a default clip for playback

          var tracks = [];

          for ( var id in library.animations ) {

            var animationTracks = getAnimation( id );

            for ( var i = 0, l = animationTracks.length; i < l; i ++ ) {

              tracks.push( animationTracks[ i ] );

            }

          }

          animations.push( new THREE.AnimationClip( 'default', - 1, tracks ) );

        }

      } else {

        for ( var id in clips ) {

          animations.push( getAnimationClip( id ) );

        }

      }

    }