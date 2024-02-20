function parseKinematicsBindJointAxis( xml ) {

      var data = {
        target: xml.getAttribute( 'target' ).split( '/' ).pop()
      };

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'axis':
            var param = child.getElementsByTagName( 'param' )[ 0 ];
            data.axis = param.textContent;
            var tmpJointIndex = data.axis.split( 'inst_' ).pop().split( 'axis' )[ 0 ];
            data.jointIndex = tmpJointIndex.substr( 0, tmpJointIndex.length - 1 );
            break;

        }

      }

      return data;

    }