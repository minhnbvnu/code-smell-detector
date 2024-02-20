function buildAnimationClip( data ) {

      var tracks = [];

      var name = data.name;
      var duration = ( data.end - data.start ) || - 1;
      var animations = data.animations;

      for ( var i = 0, il = animations.length; i < il; i ++ ) {

        var animationTracks = getAnimation( animations[ i ] );

        for ( var j = 0, jl = animationTracks.length; j < jl; j ++ ) {

          tracks.push( animationTracks[ j ] );

        }

      }

      return new THREE.AnimationClip( name, duration, tracks );

    }