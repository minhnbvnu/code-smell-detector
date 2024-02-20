function parseKinematicsScene( xml ) {

      var data = {
        bindJointAxis: []
      };

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'bind_joint_axis':
            data.bindJointAxis.push( parseKinematicsBindJointAxis( child ) );
            break;

        }

      }

      library.kinematicsScenes[ parseId( xml.getAttribute( 'url' ) ) ] = data;

    }