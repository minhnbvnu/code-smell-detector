function createKeyframeTracks( animation, tracks ) {

      var keyframes = animation.keyframes;
      var name = animation.name;

      var times = [];
      var positionData = [];
      var quaternionData = [];
      var scaleData = [];

      for ( var i = 0, l = keyframes.length; i < l; i ++ ) {

        var keyframe = keyframes[ i ];

        var time = keyframe.time;
        var value = keyframe.value;

        matrix.fromArray( value ).transpose();
        matrix.decompose( position, quaternion, scale );

        times.push( time );
        positionData.push( position.x, position.y, position.z );
        quaternionData.push( quaternion.x, quaternion.y, quaternion.z, quaternion.w );
        scaleData.push( scale.x, scale.y, scale.z );

      }

      if ( positionData.length > 0 ) tracks.push( new THREE.VectorKeyframeTrack( name + '.position', times, positionData ) );
      if ( quaternionData.length > 0 ) tracks.push( new THREE.QuaternionKeyframeTrack( name + '.quaternion', times, quaternionData ) );
      if ( scaleData.length > 0 ) tracks.push( new THREE.VectorKeyframeTrack( name + '.scale', times, scaleData ) );

      return tracks;

    }